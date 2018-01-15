/**
 * Script to start controller
 */

import {API_URL, HARDWARE_CLASS} from './config';
import * as io from 'socket.io-client';
import {Logger} from '../core/config';
import * as interfaces from './interfaces';

const logger = new Logger();

let client = io.connect(API_URL, {
  transports: ['websocket'],
});

client.once('connect', () => {
  let hardware = new (interfaces[HARDWARE_CLASS])();

  logger.log('info', 'Starting controller');

  client
    .emit('watervalve', null)
    .on('watervalve', ({data: valve}) => {
      let desiredState = valve.state;

      if (desiredState !== hardware.valveState) {
        logger.log('debug', `Changing valve to ${desiredState} state`);

        // Change hardware state
        hardware.setWaterValve(desiredState)
          .then(() => {
            // Propagate state change to API
            valve.currentState = hardware.valveState;
            client.emit('watervalve', valve);
          });
      }
    });
});
