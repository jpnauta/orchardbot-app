import socketIO from 'socket.io';

import {Logger} from '../core/config';
import {interceptAllMessages} from '../core/sockets';

const logger = new Logger();

function setup(server) {
  const io = socketIO(server);

  // Setup basic express server
  io.sockets
    .on('connection', (socket) => {
      interceptAllMessages(socket);

      // Proxy to all clients except sender
      socket.on('*', (channel, data) => {
        logger.debug(`(${channel}) proxying`);
        socket.broadcast.emit(channel, data);
      });
    });

  return server;
}

exports.setup = setup;
