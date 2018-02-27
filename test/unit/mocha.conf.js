// Configure environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'warn';

// Use different DB during test
if (process.env.MONGODB_CONNECTION_STRING) {
  process.env.MONGODB_CONNECTION_STRING += '_test';
}

require('babel-core/register');

global.expect = require('chai').expect;

require('promise/lib/rejection-tracking').enable({
  allRejections: true,
}); // enable logging of unhandled ReferenceErrors and TypeErrors
