import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data.source';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, DB_PORT, DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, JWT_SECRET } = process.env;

export abstract class ConfigServer {
  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
