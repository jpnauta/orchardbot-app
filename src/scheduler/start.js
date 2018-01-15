/**
 * Script to start scheduler
 */

import {API_URL} from './config';
import {closeWaterValve, openWaterValve} from './actions';
import {PeriodicTask} from './tasks';
import {Logger} from '../core/config';
import * as io from 'socket.io-client';
import parser from 'cron-parser';


const logger = new Logger(__filename);

let client = io.connect(API_URL, {
  transports: ['websocket'],
});

client.once('connect', () => {
  logger.log('info', `Starting scheduler`);

  /**
   * Tells the API server to open the valve
   */
  let invokeValveOpen = new PeriodicTask(() => {
    logger.log('debug', 'Valve open: started');
    openWaterValve(API_URL, () => {
      logger.log('debug', 'Valve open: complete');
    });
  });

  /**
   * Tells the API server to close the valve
   */
  let invokeValveClose = new PeriodicTask(() => {
    logger.log('debug', 'Valve close: started');
    closeWaterValve(API_URL, () => {
      logger.log('debug', 'Valve close: complete');
    });
  });

  client
    .emit('waterschedule', null)
    .on('waterschedule', ({data: schedule}) => {
      logger.log('debug', `Setting schedule ${schedule.openCron}, ${schedule.closeCron}`);

      invokeValveOpen.setCron(schedule.openCron);
      invokeValveClose.setCron(schedule.closeCron);
    });
});
