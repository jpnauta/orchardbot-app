import express from 'express';
import {createServer} from 'http';

import {setup} from './routes';

// Setup basic express server
const app = express();
const server = createServer(app);

// Configure routes
setup(server);

export default server;
