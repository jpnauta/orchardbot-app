import * as Promise from 'promise';
import {Logger} from '../core/config';

const logger = new Logger();

/**
 * Base class for communicating with the system's physical hardware
 */
class HardwareInterface {
  constructor(task) {
    this.valveState = null;  // Current state of the water valve
  }

  _setWaterValve(state) {
    throw new Error('Implemented by subclasses');
  }

  /**
   * Changes water valve to the desired state
   * @param state {WATER_VALVE_STATES} water valve state
   * @return {Promise} promise triggered when hardware change is complete
   */
  setWaterValve(state) {
    return this._setWaterValve(state)
      .then(() => {
        // If successful, update `valveState`
        this.valveState = state;
      });
  }
}

/**
 * Hardware interface that does not actually do anything
 */
export class FakeHardwareInterface extends HardwareInterface {
  _setWaterValve(state) {
    logger.log('debug', `Set hardware valve ${state} state`);
    return Promise.resolve();
  }
}
