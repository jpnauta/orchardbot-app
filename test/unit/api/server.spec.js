import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import {each} from 'lodash';

import {init} from '../../../dist/api/data';
import {makeAPIClient} from '../../../dist/api/clients';
import {once} from '../../../dist/core/sockets';
import server from '../../../dist/api/server';

describe('socket server', () => {
  let clients = [];

  async function makeClient() {
    const client = makeAPIClient('http://localhost:9101', {forceNewConnection: true});

    clients.push(client); // So it can be closed later

    await once(client, 'connect');

    return client;
  }

  beforeEach(async () => {
    clients = []; // Clear client list

    await init(); // Initialize `DATA`

    await new Promise((fulfill) => {
      server.listen(9101, () => fulfill());
    });
  });

  afterEach(() => {
    each(clients, (client) => {
      client.close();
    });
    server.close();
  });

  describe('waterschedule', () => {
    it('retrieves current state', async () => {
      // GIVEN
      const client = await makeClient();

      client.emit('waterschedule', null);

      // THEN
      const {status, data: schedule} = await once(client, 'waterschedule');

      expect(status).to.equal('success');
      expect(schedule._id).to.be.a('string');
      expect(schedule.openCron).to.be.a('string');
      expect(schedule.closeCron).to.be.a('string');
    });

    it('updates current schedule', async () => {
      // GIVEN 2 socket clients
      const c1 = await makeClient();
      const c2 = await makeClient();

      // WHEN one client updates
      await c1.emit('waterschedule', {openCron: '0 20 * * *'});
      const msg = await once(c2, 'waterschedule');

      // THEN the other client receives the update
      expect(msg).to.nested.include({
        status: 'success',
        'data.openCron': '0 20 * * *',
        'data.closeCron': '0 20 * * *',
      });
    });

    it('rejects invalid data 1', async () => {
      // GIVEN
      const client = await makeClient();

      // WHEN
      client.emit('waterschedule', {openCron: 'abc * * * *'});
      const msg = await once(client, 'waterschedule');

      // THEN
      expect(msg).to.deep.include({
        status: 'failure',
        error: {
          errors: {
            openCron: '`abc * * * *` is not a cron expression',
          },
        },
      });
    });

    it('rejects invalid data 2', async () => {
      // GIVEN 2 socket clients
      const c1 = await makeClient();
      const c2 = await makeClient();

      // Ensure client 2 does not receive any updates
      c2.on('waterschedule', expect.fail);

      // WHEN client 1 sends invalid data
      await c1.emit('waterschedule', {openCron: null});
      const msg = await once(c1, 'waterschedule');

      // THEN failure is indicated
      expect(msg).to.nested.include({
        status: 'failure',
        'error.errors.openCron': 'Path `openCron` is required.',
      });
    });
  });

  describe('watervalve', () => {
    it('retrieves current state', async () => {
      // GIVEN
      const client = await makeClient();

      // WHEN
      client.emit('watervalve', null);
      const {status, data: valve} = await once(client, 'watervalve');

      // THEN
      expect(status).to.equal('success');
      expect(valve._id).to.be.a('string');
      expect(valve.state).to.be.a('string');
      expect(valve.currentState).to.be.a('string');
    });

    it('updates valve state', async () => {
      // GIVEN 2 socket clients
      const c1 = await makeClient();
      const c2 = await makeClient();

      // WHEN one client updates
      c1.emit('watervalve', {state: 'open'});

      // THEN the other client receives the update
      const msg = await once(c2, 'watervalve');

      expect(msg).to.nested.include({
        status: 'success',
        'data.state': 'open',
      });
    });

    it('rejects invalid data 1', async () => {
      // GIVEN
      const client = await makeClient();

      // WHEN
      client.emit('watervalve', {state: 'invalid'});
      const msg = await once(client, 'watervalve');

      // THEN
      expect(msg).to.deep.include({
        status: 'failure',
        error: {
          errors: {
            state: '`invalid` is not a valid enum value for path `state`.',
          },
        },
      });
    });
  });
});
