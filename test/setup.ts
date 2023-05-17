import { config } from 'dotenv-cra';
import winston from 'winston';

config({ env: 'test' });

const { LOGGING_ENABLED } = process.env;

winston.configure({
  silent: LOGGING_ENABLED !== 'true',
});
