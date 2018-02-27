import {env} from '../core/config';

// Parse configuration constants
export const API_URL = env('API_URL', 'http://localhost:9001').required().asString();
export const MASTER_URL = env('MASTER_URL', 'http://localhost:9002').required().asString();

export const CHANNELS = [
  {
    url: API_URL,
  }, {
    url: MASTER_URL,
  },
];
