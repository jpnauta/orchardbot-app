import factory from 'factory-girl';

import {WaterSchedule, WaterValve} from '../../../dist/data/schemas';
import {WATER_VALVE_STATES} from '../../../dist/core/constants';

factory.define('WaterSchedule', WaterSchedule, {
  openCron: '0 15 * * *',
  closeCron: '0 20 * * *',
});

factory.define('WaterValve', WaterValve, {
  state: WATER_VALVE_STATES.get('closed'),
  currentState: WATER_VALVE_STATES.get('closed'),
});

export {
  factory,
};
