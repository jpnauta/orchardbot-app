import {DATA} from './data';
import {Logger} from '../core/config';
import * as http from 'http';
import socketIO from 'socket.io';
import * as _ from 'lodash';

const logger = new Logger();

/**
 * TODO docs
 * @param io
 * @param socket
 * @param channel
 * @param key
 */
function makeDataChannel(io, socket, channel, key) {
  socket.on(channel, function (msg) {
    if (msg) {  // Message contains data => update data
      logger.log('debug', `(${channel}) Saving...`);
      // Clone existing data and attempt to update it in DB
      let obj = _.cloneDeep(DATA[key]);
      _.assign(obj, msg);

      obj.save()
        .then(() => {
          logger.log('debug', `(${channel}) Save complete`);
          DATA[key] = obj;  // Apply changes to data source
          io.emit(channel, {  // Emit changes to EVERYONE
            status: 'success',
            data: DATA[key],
          });
        })
        .catch(({errors = null}) => {
          // Indicate failure
          socket.emit(channel, {
            status: 'failure',
            error: {
              errors: _.mapValues(errors, 'message'),
            },
          });
        });
    } else {  // Not data given => send current data
      logger.log('debug', `(${channel}) Sending`);
      socket.emit(channel, {
        status: 'success',
        data: DATA[key],
      });
    }
  });
};

function setup(app) {
  const server = http.createServer(app);
  const io = socketIO(server);

  // Setup basic express server
  io.sockets
    .on('connection', (socket) => {
      makeDataChannel(io, socket, 'waterschedule', 'waterschedule');
      makeDataChannel(io, socket, 'watervalve', 'watervalve');
    });

  return server;
}

exports.setup = setup;
