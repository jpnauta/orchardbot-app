import parser from 'cron-parser';

/**
 * @param v crontab to validate (e.g. '*\/2 * * * *')
 * @returns {boolean} whether or not cron expression is valid
 */
function cronExp(v) {
  try {
    parser.parseExpression(v);
    return true;
  } catch (err) {
    return false;
  }
}

export {
  cronExp,
};
