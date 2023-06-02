export interface Configuration {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID: string;
  FRONTEND_URL: string;
  STRIPE_WEBHOOK_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_TIMEOUT: number;
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_FROM_NAME: string;
}
