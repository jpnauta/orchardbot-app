/**
 * Script to start scheduler
 */
import {each} from 'lodash';

import {CHANNELS} from './config';
import {Logger} from '../core/config';
import {makeAPIClient} from '../api/clients';


const logger = new Logger(__filename);
each(CHANNELS, (channel) => {
  /* eslint-disable no-param-reassign */
  channel.client = makeAPIClient(channel.url);

  logger.info(`Connecting to ${channel.url}`);
  channel.client.once('connect', () => {
    logger.info(`Connected to ${channel.url}`);

    channel.client.on('*', (event, data) => {
      logger.debug(`(${event}) received from ${channel.url}`);
      each(CHANNELS, (c) => {
        if (c.client !== channel.client) {
          logger.debug(`(${event}) sending emit to ${c.url}`);
          c.client.emit(event, data);
        }
      });
    });
  });
});
