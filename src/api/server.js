import {setup} from './routes';
import express from 'express';

// Setup basic express server
let app = express();

// Configure routes
let server = setup(app);

module.exports = server;
