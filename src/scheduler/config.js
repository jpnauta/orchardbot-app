import {env} from '../core/config';

// Parse configuration constants
export const API_URL = env('API_URL', 'http://localhost:9001').required().asString();
