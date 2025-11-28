import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3333,
  database: {
    type: 'sqlite',
    database: process.env.DATABASE_NAME || 'db.sqlite',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  },
  swagger: {
    enabled: process.env.NODE_ENV !== 'production',
    path: 'api/docs',
  },
}));
