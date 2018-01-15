import {env} from '../core/config';
import mongoose from 'mongoose';

// Parse configuration constants
export const MONGODB_CONNECTION_STRING = env('MONGODB_CONNECTION_STRING').required().asString();

// Initialize mongodb client
mongoose.connect(MONGODB_CONNECTION_STRING, {
  useMongoClient: true,
});

// Configure promise library
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;
