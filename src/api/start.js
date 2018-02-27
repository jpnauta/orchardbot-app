/**
 * Script to start API server
 */

import server from './server';
import {HOST, PORT} from './config';
import {init} from './data';
import {Logger} from '../core/config';

const logger = new Logger();

async function start() {
  logger.log('info', 'Starting API');
  await init(); // Initialize `DATA`

  await new Promise((fulfill) => {
    server.listen(PORT, HOST, () => fulfill());
  });

  logger.log('info', `Server listening on ${HOST}:${PORT}`);
}

start();
