import {env} from '../core/config';

// Parse configuration constants
export const HOST = env('HOST', 'localhost').required().asString();
export const PORT = env('PORT', 9001).required().asPositiveInt();
