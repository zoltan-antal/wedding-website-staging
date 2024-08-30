import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const NODE_ENV = process.env.NODE_ENV as 'development' | 'production';
