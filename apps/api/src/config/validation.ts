import { z } from 'zod';


const EnvironmentSchema = z.enum(['development', 'production', 'test']);

const EnvSchema = z.object({
  NODE_ENV: EnvironmentSchema.default('development'),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_NAME: z.string().optional().default('db.sqlite'),
  CORS_ORIGIN: z.string().optional().default('http://localhost:4200'),
});

export type EnvironmentVariables = z.infer<typeof EnvSchema>;

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const result = EnvSchema.safeParse(config);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
}
