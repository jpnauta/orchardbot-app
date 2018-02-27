/**
 * Enables a socket to use the event `socket.on('*',`
 * @param socket socket.io connection
 */
export function interceptAllMessages(socket) {
  // Hack job to make `socket.on('*', ...)` work
  const {onevent} = socket;

  /* eslint-disable no-param-reassign, func-names */
  socket.onevent = function (packet) {
    const args = packet.data || [];
    onevent.call(this, packet); // original call
    packet.data = ['*'].concat(args);
    onevent.call(this, packet); // additional call to catch-all
  };
}

/**
 * Async-await version of `client.once(...)`
 * @param client socket.io connection
 * @param channel
 * @return {Promise<void>}
 */
export async function once(client, channel) {
  return new Promise(function (fulfill) {
    client.once(channel, (data) => {
      fulfill(data);
    })
  });
}
