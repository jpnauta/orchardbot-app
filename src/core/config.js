import _env from 'env-var';
import * as winston from 'winston';
import dotenv from 'dotenv';

// Export environment parser
export const env = _env;

// Load .env file into process environment variables
dotenv.config();

// Parse configuration constants
env('NODE_ENV').required().asString();
export const LOG_LEVEL = env('LOG_LEVEL', 'debug').required().asString();

// Set logging level
winston.level = LOG_LEVEL;

export class Logger extends winston.Logger {
  constructor() {
    super({
      transports: [
        new winston.transports.Console({
          level: LOG_LEVEL,
          colorize: true
        })
      ]
    });
  }
}
