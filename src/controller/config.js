import {env} from '../core/config';

// Parse configuration constants
export const API_URL = env('API_URL', 'http://localhost:9001').required().asString();
export const HARDWARE_CLASS = env('HARDWARE_CLASS', 'FakeHardwareInterface').required().asString();
