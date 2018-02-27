import * as io from 'socket.io-client';
import {interceptAllMessages} from '../core/sockets';

export function makeAPIClient(url, {forceNewConnection = false} = {}) {
  const client = io.connect(url, {
    transports: ['websocket'],
    'force new connection': forceNewConnection,
  });

  interceptAllMessages(client);

  return client;
}
