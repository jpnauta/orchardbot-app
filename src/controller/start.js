/**
 * Script to start controller
 */
import {cloneDeep} from 'lodash';

import {API_URL, HARDWARE_CLASS} from './config';
import {Logger} from '../core/config';
import * as interfaces from './interfaces';
import {makeAPIClient} from '../api/clients';

const logger = new Logger();

const client = makeAPIClient(API_URL);

logger.log('info', 'Starting');
client.once('connect', () => {
  const hardware = new (interfaces[HARDWARE_CLASS])();

  client
    .emit('watervalve', null)
    .on('watervalve', async ({data}) => {
      const valve = cloneDeep(data);
      const desiredState = valve.state;

      if (desiredState !== hardware.valveState) {
        logger.log('debug', `Changing valve to ${desiredState} state`);

        // Change hardware state
        await hardware.setWaterValve(desiredState);

        // Propagate state change to API
        valve.currentState = hardware.valveState;
        client.emit('watervalve', valve);
      }
    });

  logger.log('info', 'Started');
});
