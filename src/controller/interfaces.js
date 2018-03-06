import {promisify} from 'util';

import {Logger} from '../core/config';

const logger = new Logger();

/**
 * Base class for communicating with the system's physical hardware
 */
class HardwareInterface {
  constructor() {
    this.valveState = null; // Current state of the water valve
  }

  /* eslint-disable class-methods-use-this, no-unused-vars */
  async $setWaterValve(state) {
    throw new Error('Implemented by subclasses');
  }

  /**
   * Changes water valve to the desired state
   * @param state {WATER_VALVE_STATES} water valve state
   * @return {Promise} promise triggered when hardware change is complete
   */
  async setWaterValve(state) {
    await this.$setWaterValve(state);

    // Update `valveState`
    this.valveState = state;
  }
}

/**
 * Hardware interface that does not actually do anything
 */
export class FakeHardwareInterface extends HardwareInterface {
  // eslint-disable class-methods-use-this
  async $setWaterValve(state) {
    logger.log('debug', `Set hardware valve ${state} state`);
  }
}

export class RaspberryPiHardwareInterface extends HardwareInterface {
  constructor() {
    super();

    // Initialize input pin
    const {Gpio} = require('onoff');
    this.gpio = new Gpio(17, 'out');

    // Revert the input pin on SIGINT
    process.on('SIGINT', () => {
      this.led.unexport();
    });
  }

  // eslint-disable class-methods-use-this
  async $setWaterValve(state) {
    const gpioState = state ? 1 : 0;
    return promisify(this.gpio.write(gpioState));
  }
}
