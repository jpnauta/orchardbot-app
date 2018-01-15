/**
 * Script to start API server
 */

import server from './server';
import {API_HOST, API_PORT} from './config';
import {init} from './data';
import {Logger} from '../core/config';

const logger = new Logger();

logger.log('info', 'Starting API');
init()  // Initialize `DATA`
  .then(() => {
    server.listen(API_PORT, API_HOST, function () {
      logger.log('info', `API server listening on ${API_HOST}:${API_PORT}`);
    });
  });
