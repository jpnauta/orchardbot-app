import {init} from '../../../dist/api/data';
import {makeAPIClient} from '../../../src/api/clients';
import * as _ from 'lodash';

describe('socket server', () => {
  let server;
  let clients = [];

  function makeClient() {
    let client = makeAPIClient('http://localhost:3000', {forceNewConnection: true});

    clients.push(client);  // So it can be closed later

    return client;
  }

  beforeEach((done) => {
    clients = [];  // Clear client list

    // start the server
    server = require('../../../dist/api/server');

    init()  // Initialize `DATA`
      .then(() => {
        server.listen(3000, () => done());
      });
  });

  afterEach(() => {
    _.each(clients, (client) => {
      client.close();
    });
    server.close();
  });

  describe('waterschedule', () => {
    it('retrieves current state', (done) => {
      // GIVEN
      let client = makeClient();

      client.once('connect', () => {
        client
        // WHEN
          .emit('waterschedule', null)
          // THEN
          .on('waterschedule', ({status, data: schedule}) => {
            expect(status).to.equal('success');
            expect(schedule._id).to.be.a('string');
            expect(schedule.openCron).to.be.a('string');
            expect(schedule.closeCron).to.be.a('string');
            done();
          });
      });
    });

    it('updates current schedule', (done) => {
      // GIVEN 2 socket clients
      let c1 = makeClient();

      c1.once('connect', () => {
        let c2 = makeClient();

        c2.once('connect', () => {
          // WHEN one client updates
          c1.emit('waterschedule', {openCron: '0 20 * * *'});

          // THEN the other client receives the update
          c2.on('waterschedule', (msg) => {
            expect(msg).to.nested.include({
              'status': 'success',
              'data.openCron': '0 20 * * *',
              'data.closeCron': '0 20 * * *',
            });
            done();
          });
        });
      });
    });

    it('rejects invalid data 1', (done) => {
      // GIVEN
      let client = makeClient();

      client.once('connect', () => {
        client
        // WHEN
          .emit('waterschedule', {openCron: 'abc * * * *'})
          // THEN
          .on('waterschedule', (msg) => {
            expect(msg).to.deep.include({
              status: 'failure',
              error: {
                errors: {
                  openCron: '`abc * * * *` is not a cron expression',
                }
              }
            });
            done();
          });
      });
    });

    it('rejects invalid data 2', (done) => {
      // GIVEN 2 socket clients
      let c1 = makeClient();

      c1.once('connect', () => {
        let c2 = makeClient();

        c2.once('connect', () => {
          // WHEN client 1 sends invalid data
          c1
            .emit('waterschedule', {openCron: null})
            // THEN failure is indicated
            .on('waterschedule', (msg) => {
              expect(msg).to.nested.include({
                'status': 'failure',
                'error.errors.openCron': 'Path `openCron` is required.',
              });

              done();
            });

          // AND client 2 does not receive any updates
          c2.on('waterschedule', expect.fail);
        });
      });
    });
  });

  describe('watervalve', () => {
    it('retrieves current state', (done) => {
      // GIVEN
      let client = makeClient();

      client.once('connect', () => {
        client
        // WHEN
          .emit('watervalve', null)
          // THEN
          .on('watervalve', ({status, data: valve}) => {
            expect(status).to.equal('success');
            expect(valve._id).to.be.a('string');
            expect(valve.state).to.be.a('string');
            expect(valve.currentState).to.be.a('string');
            done();
          });
      });
    });

    it('updates valve state', (done) => {
      // GIVEN 2 socket clients
      let c1 = makeClient();

      c1.once('connect', () => {
        let c2 = makeClient();

        c2.once('connect', () => {
          // WHEN one client updates
          c1.emit('watervalve', {state: 'open'});

          // THEN the other client receives the update
          c2.on('watervalve', (msg) => {
            expect(msg).to.nested.include({
              'status': 'success',
              'data.state': 'open',
            });
            done();
          });
        });
      });
    });

    it('rejects invalid data 1', (done) => {
      // GIVEN
      let client = makeClient();

      client.once('connect', () => {
        client
        // WHEN
          .emit('watervalve', {state: 'invalid'})
          // THEN
          .on('watervalve', (msg) => {
            expect(msg).to.deep.include({
              status: 'failure',
              error: {
                errors: {
                  state: '`invalid` is not a valid enum value for path `state`.',
                }
              }
            });
            done();
          });
      });
    });
  });
});
