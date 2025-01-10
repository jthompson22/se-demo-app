import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });
//#yolo
export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://default:hJFmpiH7LcO0@ep-jolly-hall-a4590z2b-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require',
  },
});
