import {callWaterValve} from '../api/actions';

/**
 * Retrieves the current state of the water valve
 * @param url URL to API server
 * @param done function called after completion
 */
export function getWaterValve(url, done) {
  callWaterValve(url, null, done);
}

/**
 * Sets the current state of the water valve to `open`
 * @param url URL to API server
 * @param done function called after completion
 */
export function openWaterValve(url, done) {
  callWaterValve(url, {state: 'open', stateLastUpdated: new Date()}, done);
}

/**
 * Sets the current state of the water valve to `closed`
 * @param url URL to API server
 * @param done function called after completion
 */
export function closeWaterValve(url, done) {
  callWaterValve(url, {state: 'closed', stateLastUpdated: new Date()}, done);
}
