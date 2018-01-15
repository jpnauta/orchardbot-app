import * as io from 'socket.io-client';

export function makeAPIClient(url, {forceNewConnection = false} = {}) {
  return io.connect(url, {
    transports: ['websocket'],
    'force new connection': forceNewConnection,
  });
}
