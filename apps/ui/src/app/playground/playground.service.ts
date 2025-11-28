import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define interfaces for log messages
export interface RenovateLogMessage {
  time: string;
  msg: string;
  level?: string;
  type?: string;
  packageFiles?: any;
  config?: any;
  branchesInformation?: any[];
}

// Define interface for the Renovate run result
export interface RenovateRunResult {
  messages: Observable<RenovateLogMessage>;
  eventSource: { close: () => void };
}

@Injectable({
  providedIn: 'root',
})
export class PlaygroundService {
  constructor() {}

  runRenovate(githubToken: string, repositoryUrl: string, renovateConfig: object): RenovateRunResult {
    const sseUrl = `/api/playground/run`;
    const body = JSON.stringify({
      token: githubToken,
      repository: repositoryUrl,
      config: renovateConfig
    });

    let abortController = new AbortController();

    // Create a mock EventSource-like object for compatibility
    const eventSource = {
      close: () => {
        abortController.abort();
      }
    };

    // Create the observable for messages using fetch with POST
    const messagesObservable = new Observable<RenovateLogMessage>(observer => {
      // Use fetch to make POST request and read SSE stream
      fetch(sseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
        signal: abortController.signal
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        if (!reader) {
          throw new Error('Response body is not readable');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            observer.complete();
            break;
          }

          // Decode the chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });

          // Process complete SSE messages (separated by \n\n)
          const messages = buffer.split('\n\n');
          buffer = messages.pop() || ''; // Keep incomplete message in buffer

          for (const message of messages) {
            if (!message.trim()) continue;

            // Parse SSE format: "data: {...}"
            const dataMatch = message.match(/^data: (.+)$/m);
            if (!dataMatch) continue;

            try {
              const parsedData = JSON.parse(dataMatch[1]);

              // Try to parse the data field if it's a JSON string
              if (parsedData.data && typeof parsedData.data === 'string') {
                try {
                  const innerData = JSON.parse(parsedData.data);

                  // Create a log message object
                  const logMessage: RenovateLogMessage = {
                    time: parsedData.time || new Date().toISOString(),
                    msg: innerData.msg || '',
                    level: innerData.level || parsedData.level || 'info',
                    type: parsedData.type || 'log'
                  };

                  // Check if this contains packageFiles data
                  if (innerData.msg === 'packageFiles with updates' && innerData.config) {
                    logMessage.config = innerData.config;
                    logMessage.type = 'packageFilesWithUpdates';
                  } else if (innerData.msg === 'packageFiles' && innerData.packageFiles) {
                    logMessage.packageFiles = innerData.packageFiles;
                    logMessage.type = 'packageFiles';
                  } else if (innerData.msg === 'branches info extended' && innerData.branchesInformation) {
                    logMessage.branchesInformation = innerData.branchesInformation;
                    logMessage.type = 'branchesInfoExtended';
                  }

                  observer.next(logMessage);
                } catch (innerError) {
                  // If inner parsing fails, use the outer object
                  observer.next({
                    time: parsedData.time || new Date().toISOString(),
                    msg: parsedData.data,
                    level: parsedData.level || 'info',
                    type: parsedData.type || 'log'
                  });
                }
              } else {
                // If data is not a parseable JSON string, use the outer object
                observer.next({
                  time: parsedData.time || new Date().toISOString(),
                  msg: parsedData.data || parsedData.msg || '',
                  level: parsedData.level || 'info',
                  type: parsedData.type || 'log'
                });
              }

              // If this is a completion message, complete the stream
              if (parsedData.type === 'success' || parsedData.type === 'warning' || parsedData.type === 'complete') {
                observer.complete();
                eventSource.close();
                break;
              }
            } catch (e) {
              // If parsing fails, skip this message
              console.error('Failed to parse SSE message:', e);
            }
          }
        }
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          observer.error(error);
        }
        observer.complete();
      });

      // Return teardown logic
      return () => {
        eventSource.close();
      };
    });

    // Return both the observable and the EventSource instance
    return {
      messages: messagesObservable,
      eventSource: eventSource
    };
  }
}
