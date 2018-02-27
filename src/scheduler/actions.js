import {callWaterValve} from '../api/actions';

/**
 * Retrieves the current state of the water valve
 * @param url URL to API server
 */
export async function getWaterValve(url) {
  return await callWaterValve(url, null);
}

/**
 * Sets the current state of the water valve to `open`
 * @param url URL to API server
 */
export async function openWaterValve(url) {
  return await callWaterValve(url, {state: 'open', stateLastUpdated: new Date()});
}

/**
 * Sets the current state of the water valve to `closed`
 * @param url URL to API server
 */
export async function closeWaterValve(url) {
  return await callWaterValve(url, {state: 'closed', stateLastUpdated: new Date()});
}
