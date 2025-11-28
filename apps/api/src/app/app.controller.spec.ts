import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const result = controller.getHealth();
      
      expect(result).toEqual({ status: 'ok' });
    });

    it('should return an object with status property', () => {
      const result = controller.getHealth();
      
      expect(result).toHaveProperty('status');
      expect(typeof result.status).toBe('string');
    });
  });

  describe('getVersion', () => {
    it('should return version information', () => {
      const result = controller.getVersion();
      
      expect(result).toEqual({ version: '1.0.0' });
    });

    it('should return an object with version property', () => {
      const result = controller.getVersion();
      
      expect(result).toHaveProperty('version');
      expect(typeof result.version).toBe('string');
    });

    it('should return a valid semver version', () => {
      const result = controller.getVersion();
      const semverRegex = /^\d+\.\d+\.\d+$/;
      
      expect(result.version).toMatch(semverRegex);
    });
  });
});
