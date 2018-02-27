import mongoose from 'mongoose';

import {WATER_VALVE_STATES} from '../core/constants';
import * as validators from './validators';

require('./config'); // Initialize mongodb config

const schemaOpts = {
  timestamps: true,
};

/**
 * Indicates when to turn on & off water
 */
export const WaterSchedule = mongoose.model('WaterSchedule', new mongoose.Schema({
  /**
   * When to turn on water
   */
  openCron: {
    type: String,
    required: true,
    validate: [
      {
        validator: validators.cronExp,
        message: '`{VALUE}` is not a cron expression',
      },
    ],
  },
  /**
   * When to turn off water
   */
  closeCron: {
    type: String,
    required: true,
    validate: [
      {
        validator: validators.cronExp,
        message: '`{VALUE}` is not a cron expression',
      },
    ],
  },
}, schemaOpts));

/**
 * Controls a water valve
 */
export const WaterValve = mongoose.model('WaterValve', new mongoose.Schema({
  /**
   * Desired water valve state
   */
  state: {
    type: String,
    required: true,
    enum: WATER_VALVE_STATES.getChoices(),
  },
  stateLastUpdated: {
    type: Date,
    required: false,
  },
  /**
   * Current water valve state
   */
  currentState: {
    type: String,
    required: true,
    enum: WATER_VALVE_STATES.getChoices(),
  },
}, schemaOpts));
