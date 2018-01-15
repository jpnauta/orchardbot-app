import {init} from '../../../dist/api/data';
import {closeWaterValve, getWaterValve, openWaterValve} from '../../../src/scheduler/actions';
import moment from 'moment';

describe('socket server', () => {
  let apiServer;
  let apiServerUrl = 'http://localhost:3000';

  beforeEach((done) => {
    // start the server
    apiServer = require('../../../dist/api/server');

    init()  // Initialize `DATA`
      .then(() => {
        apiServer.listen(3000, () => done());
      });
  });

  describe('openWaterValve', () => {
    it('updates valve state', (done) => {
      // WHEN
      openWaterValve(apiServerUrl, () => {
        getWaterValve(apiServerUrl, ({data}) => {
          expect(data.state).to.be.equal('open');
          expect(moment(data.stateLastUpdated).isValid()).to.be.equal(true);
          done();
        });
      });
    });
  });

  describe('closeWaterValve', () => {
    it('updates valve state', (done) => {
      // WHEN
      openWaterValve(apiServerUrl, () => {
        closeWaterValve(apiServerUrl, () => {
          getWaterValve(apiServerUrl, ({data}) => {
            expect(data.state).to.be.equal('closed');
            expect(moment(data.stateLastUpdated).isValid()).to.be.equal(true);
            done();
          });
        });
      });
    });
  });
});
