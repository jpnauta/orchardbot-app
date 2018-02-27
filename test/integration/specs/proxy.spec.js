import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import io from 'socket.io-client';

describe('proxies', () => {
  function makeAPIClient(url, {forceNewConnection = false} = {}) {
    return io.connect(url, {
      transports: ['websocket'],
      'force new connection': forceNewConnection,
    });
  }

  async function once(client, channel) {
    return new Promise(function (fulfill) {
      client.once(channel, function (data) {
        fulfill(data);
      });
    });
  }

  let apiClient;
  let masterClient;

  beforeEach(async () => {
    apiClient = makeAPIClient('http://api:9201', {forceNewConnection: true});
    masterClient = makeAPIClient('http://proxy-master:9202', {forceNewConnection: true});

    // Connect to clients
    await once(apiClient, 'connect');
    await once(masterClient, 'connect');
  });

  afterEach(() => {
    apiClient.close();
    masterClient.close();
  });

  it('retrieves data from API via master-proxy', async () => {
    const promise = masterClient.once('waterschedule');
    masterClient.emit('waterschedule', null);
    const data = await promise;

    expect(data.openCron).to.equal('0 15 * * *');
  });
});
