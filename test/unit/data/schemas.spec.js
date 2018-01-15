import {Factory} from './factories';

describe('WaterSchedule', () => {
  describe('openCron', () => {
    it('is required', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {openCron: null}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['openCron'].message)
          .to.be.equal('Path `openCron` is required.');
        done();
      });
    });

    it('rejects invalid cron expression', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {openCron: 'abc 12 12'}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['openCron'].message)
          .to.be.equal('`abc 12 12` is not a cron expression');
        done();
      });
    });

    it('accepts valid cron expression', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {openCron: '*/2 * * * *'}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error).to.be.equal(undefined);
        done();
      });
    });
  });

  describe('closeCron', () => {
    it('is required', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {closeCron: null}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['closeCron'].message)
          .to.be.equal('Path `closeCron` is required.');
        done();
      });
    });

    it('rejects invalid cron expression', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {closeCron: 'abc 12 12'}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['closeCron'].message)
          .to.be.equal('`abc 12 12` is not a cron expression');
        done();
      });
    });

    it('accepts valid cron expression', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', {closeCron: '*/2 * * * *'}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error).to.be.equal(undefined);
        done();
      });
    });
  });

  describe('save', () => {
    it('has createdAt and updatedAt timestamps', (done) => {
      // GIVEN
      Factory.build('WaterSchedule', (schedule) => {
        // WHEN
        schedule.save()
          .then(() => {
            // THEN
            expect(schedule.updatedAt).to.be.a('date');
            expect(schedule.createdAt).to.be.a('date');
            done();
          });
      });
    });
  });
});

describe('WaterValve', () => {
  describe('state', () => {
    it('is required', (done) => {
      // GIVEN
      Factory.build('WaterValve', {state: null}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['state'].message)
          .to.be.equal('Path `state` is required.');
        done();
      });
    });

    it('rejects invalid state', (done) => {
      // GIVEN
      Factory.build('WaterValve', {state: 'invalid'}, (schedule) => {
        // WHEN
        let error = schedule.validateSync();

        // THEN
        expect(error.errors['state'].message)
          .to.be.equal('`invalid` is not a valid enum value for path `state`.');
        done();
      });
    });
  });
});
