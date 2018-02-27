import schedule from 'node-schedule';

export class PeriodicTask {
  constructor(task) {
    this.$nextTask = null;
    this.$cron = null;
    this.task = task;
  }

  /**
   * Sets the desired cron, starting the periodic tasks as needed
   */
  setCron(cron) {
    this.$cron = cron;
    this.scheduleNext();
  }

  /**
   * Sets $nextTask to the most upcoming task
   */
  scheduleNext() {
    if (this.$nextTask) {
      this.$nextTask.cancel();
    }
    this.$nextTask = schedule.scheduleJob(this.$cron, () => this.invoke());
  }

  /**
   * Called whenever a task is to be run
   */
  invoke() {
    this.task();
    this.scheduleNext();
  }
}
