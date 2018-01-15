import {env} from '../core/config';

// Parse configuration constants
export const API_HOST = env('API_HOST', 'localhost').required().asString();
export const API_PORT = env('API_PORT', 9001).required().asPositiveInt();
