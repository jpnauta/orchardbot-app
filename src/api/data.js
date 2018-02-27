import {WaterSchedule, WaterValve} from '../data/schemas';
import {WATER_VALVE_STATES} from '../core/constants';

export const DATA = {}; // To be initialized later

/**
 * Initializes `DATA.waterschedule`
 */
async function initWaterschedule() {
  let schedule = new WaterSchedule({
    openCron: '0 15 * * *',
    closeCron: '0 20 * * *',
  });

  schedule = await schedule.save();
  DATA.waterschedule = schedule;
}

/**
 * Initializes `DATA.watervalve`
 */
async function initWatervalve() {
  let valve = new WaterValve({
    state: WATER_VALVE_STATES.get('closed'),
    currentState: WATER_VALVE_STATES.get('closed'),
  });

  valve = await valve.save();
  DATA.watervalve = valve;
}

/**
 * Initializes `DATA` with appropriate information
 * @returns {Promise} empty promise triggered when data is loaded
 */
export async function init() {
  await initWaterschedule();
  await initWatervalve();
}
