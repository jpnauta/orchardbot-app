/**
 * Script to start proxy-master server
 */

import server from './server';
import {HOST, PORT} from './config';
import {Logger} from '../core/config';

const logger = new Logger();

logger.log('info', 'Starting');

server.listen(PORT, HOST, () => {
  logger.log('info', `Server listening on ${HOST}:${PORT}`);
});
