/**
 * Script to start scheduler
 */

import {API_URL} from './config';
import {closeWaterValve, openWaterValve} from './actions';
import {PeriodicTask} from './tasks';
import {Logger} from '../core/config';
import {makeAPIClient} from '../api/clients';


const logger = new Logger(__filename);

const client = makeAPIClient(API_URL);

logger.log('info', `Connecting to ${API_URL}`);
client.once('connect', () => {
  /**
   * Tells the API server to open the valve
   */
  const invokeValveOpen = new PeriodicTask(async () => {
    logger.log('debug', 'Valve open: started');
    await openWaterValve(API_URL);
    logger.log('debug', 'Valve open: complete');
  });

  /**
   * Tells the API server to close the valve
   */
  const invokeValveClose = new PeriodicTask(async () => {
    logger.log('debug', 'Valve close: started');
    await closeWaterValve(API_URL);
    logger.log('debug', 'Valve close: complete');
  });

  client
    .emit('waterschedule', null)
    .on('waterschedule', ({data: schedule}) => {
      logger.log('debug', `Setting schedule ${schedule.openCron}, ${schedule.closeCron}`);

      invokeValveOpen.setCron(schedule.openCron);
      invokeValveClose.setCron(schedule.closeCron);
    });

  logger.log('info', 'Started');
});
