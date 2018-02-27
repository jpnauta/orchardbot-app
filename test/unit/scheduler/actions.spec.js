import moment from 'moment';
import {describe, beforeEach, afterEach, it} from 'mocha';
import {expect} from 'chai';

import {init} from '../../../dist/api/data';
import {closeWaterValve, getWaterValve, openWaterValve} from '../../../src/scheduler/actions';
import apiServer from '../../../dist/api/server';

describe('socket server', () => {
  const apiServerUrl = 'http://localhost:9101';

  beforeEach(async () => {
    await init();

    await new Promise((fulfill) => {
      apiServer.listen(9101, () => fulfill());
    });
  });

  afterEach(() => {
    apiServer.close();
  });

  describe('openWaterValve', () => {
    it('updates valve state', async () => {
      // WHEN
      await openWaterValve(apiServerUrl);
      const {data} = await getWaterValve(apiServerUrl);

      // THEN
      expect(data.state).to.be.equal('open');
      expect(moment(data.stateLastUpdated).isValid()).to.be.equal(true);
    });
  });

  describe('closeWaterValve', () => {
    it('updates valve state', async () => {
      // WHEN
      await openWaterValve(apiServerUrl);
      await closeWaterValve(apiServerUrl);
      const {data} = await getWaterValve(apiServerUrl);

      // THEN
      expect(data.state).to.be.equal('closed');
      expect(moment(data.stateLastUpdated).isValid()).to.be.equal(true);
    });
  });
});
