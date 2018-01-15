import {makeAPIClient} from '../api/clients';

export function callWaterValve(url, data, done) {
  let client = makeAPIClient(url);

  client.once('connect', () => {
    client.emit('watervalve', data);
    client.on('watervalve', (msg) => {
      client.disconnect();
      done(msg);
    });
  });
}
