import {makeAPIClient} from '../api/clients';
import {once} from '../core/sockets';

export async function callWaterValve(url, data) {
  const client = makeAPIClient(url);

  await once(client, 'connect');
  await client.emit('watervalve', data);
  const msg = await once(client, 'watervalve');
  client.disconnect();

  return msg;
}
