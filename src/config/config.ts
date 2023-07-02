import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, DB_PORT, DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, JWT_SECRET } = process.env;
