import {describe, it} from 'mocha';
import {expect} from 'chai';

import {factory} from './factories';

describe('WaterSchedule', () => {
  describe('openCron', () => {
    it('is required', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {openCron: null});

      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error.errors.openCron.message)
        .to.be.equal('Path `openCron` is required.');
    });

    it('rejects invalid cron expression', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {openCron: 'abc 12 12'});

      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error.errors.openCron.message)
        .to.be.equal('`abc 12 12` is not a cron expression');
    });

    it('accepts valid cron expression', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {openCron: '*/2 * * * *'});

      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error).to.be.equal(undefined);
    });
  });

  describe('closeCron', () => {
    it('is required', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {closeCron: null});

      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error.errors.closeCron.message)
        .to.be.equal('Path `closeCron` is required.');
    });

    it('rejects invalid cron expression', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {closeCron: 'abc 12 12'});
      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error.errors.closeCron.message)
        .to.be.equal('`abc 12 12` is not a cron expression');
    });

    it('accepts valid cron expression', async () => {
      // GIVEN
      const schedule = await factory.build('WaterSchedule', {closeCron: '*/2 * * * *'});
      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error).to.be.equal(undefined);

    });
  });

  describe('save', () => {
    it('has createdAt and updatedAt timestamps', async () => {
      // GIVEN
      let schedule = await factory.build('WaterSchedule');

      // WHEN
      schedule = await schedule.save();

      // THEN
      expect(schedule.updatedAt).to.be.a('date');
      expect(schedule.createdAt).to.be.a('date');
    });
  });

  describe('WaterValve', () => {
    describe('state', () => {
      it('is required', async () => {
        // GIVEN
        const schedule = await factory.build('WaterValve', {state: null});

        // WHEN
        const error = schedule.validateSync();

        // THEN
        expect(error.errors.state.message)
          .to.be.equal('Path `state` is required.');
      });
    });

    it('rejects invalid state', async () => {
      // GIVEN
      const schedule = await factory.build('WaterValve', {state: 'invalid'});

      // WHEN
      const error = schedule.validateSync();

      // THEN
      expect(error.errors.state.message)
        .to.be.equal('`invalid` is not a valid enum value for path `state`.');
    });
  });
});
