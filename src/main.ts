import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Client } from 'pg';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const database = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await database.connect();
    await database.query('SELECT 1');
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await database.end();
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on port 3000');
}

await bootstrap();