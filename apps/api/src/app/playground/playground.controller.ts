import {
  Controller,
  Post,
  Body,
  Logger,
  Req,
  Res,
  OnModuleDestroy,
} from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { Request, Response } from 'express';

@Controller('playground')
export class PlaygroundController implements OnModuleDestroy {
  private readonly logger = new Logger(PlaygroundController.name);
  private readonly requestMap = new Map<string, { req: Request; res: Response }>();

  constructor(private readonly playgroundService: PlaygroundService) {}

  @Post('run')
  async runRenovate(
    @Body('token') token: string,
    @Body('config') config: string,
    @Body('repository') repository: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    // Validate required parameters
    if (!token) {
      res.status(400).json({ error: 'GitHub token is required' });
      return;
    }

    if (!config) {
      res.status(400).json({ error: 'Configuration is required' });
      return;
    }

    if (!repository) {
      res.status(400).json({ error: 'Repository URL is required' });
      return;
    }

    // Set proper SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control',
    });

    try {
      // Config is already an object if sent as JSON, or needs parsing if sent as string
      const parsedConfig = typeof config === 'string' ? JSON.parse(config) : config;

      // Store the request/response pair for cleanup
      const requestId = Math.random().toString(36).substring(2, 9);
      this.requestMap.set(requestId, { req, res });

      // Handle client disconnect
      req.on('close', () => {
        this.logger.log(`Client disconnected (ID: ${requestId})`);
        this.requestMap.delete(requestId);
        if (!res.writableEnded) {
          res.end();
        }
      });

      this.logger.log('Starting Renovate process...');

      // Send initial connection message
      const initialEvent = `data: ${JSON.stringify({
        data: 'Connected to Renovate stream',
        type: 'info',
        timestamp: new Date().toISOString(),
      })}\n\n`;
      res.write(initialEvent);

      // Subscribe to the service
      const subscription = this.playgroundService.runRenovate(token, repository, parsedConfig).subscribe({
        next: (event) => {
          if (!res.writableEnded) {
            const sseEvent = `data: ${JSON.stringify({
              ...event,
              timestamp: new Date().toISOString(),
            })}\n\n`;
            res.write(sseEvent);
          }
        },
        error: (error) => {
          this.logger.error('Error in SSE stream:', error);
          if (!res.writableEnded) {
            const errorEvent = `data: ${JSON.stringify({
              data: `Error: ${error.message || error}`,
              type: 'error',
              timestamp: new Date().toISOString(),
            })}\n\n`;
            res.write(errorEvent);
            res.end();
          }
          this.requestMap.delete(requestId);
        },
        complete: () => {
          this.logger.log('Renovate process completed');
          if (!res.writableEnded) {
            const completeEvent = `data: ${JSON.stringify({
              data: 'Stream completed',
              type: 'complete',
              timestamp: new Date().toISOString(),
            })}\n\n`;
            res.write(completeEvent);
            res.end();
          }
          this.requestMap.delete(requestId);
        }
      });

      // Clean up subscription when client disconnects
      req.on('close', () => {
        subscription.unsubscribe();
      });

    } catch (error) {
      this.logger.error('Error in runRenovate:', error);
      if (!res.writableEnded) {
        if (error instanceof SyntaxError) {
          res.status(400).json({ error: 'Invalid JSON configuration provided' });
        } else {
          res.status(500).json({ error: 'Failed to start Renovate process' });
        }
      }
    }
  }

  onModuleDestroy() {
    this.logger.log('Cleaning up PlaygroundController resources...');
    // Clean up any remaining requests
    this.requestMap.forEach(({ res }, id) => {
      if (!res.headersSent && !res.writableEnded) {
        res.end();
      }
      this.requestMap.delete(id);
    });
  }
}
