import {WaterSchedule, WaterValve} from '../data/schemas';
import {WATER_VALVE_STATES} from '../core/constants';
import * as Promise from 'promise';

export const DATA = {};  // To be initialized later

/**
 * Initializes `DATA.waterschedule`
 */
function initWaterschedule() {
  let schedule = new WaterSchedule({
    openCron: '0 15 * * *',
    closeCron: '0 20 * * *',
  });

  return schedule.save()
    .then((schedule) => {
      DATA.waterschedule = schedule;
    });
}

/**
 * Initializes `DATA.watervalve`
 */
function initWatervalve() {
  let valve = new WaterValve({
    state: WATER_VALVE_STATES.get('closed'),
    currentState: WATER_VALVE_STATES.get('closed'),
  });

  return valve.save()
    .then((valve) => {
      DATA.watervalve = valve;
    });
}

/**
 * Initializes `DATA` with appropriate information
 * @returns {Promise} empty promise triggered when data is loaded
 */
export function init() {
  return Promise.all([
    initWaterschedule(),
    initWatervalve(),
  ]);
}
