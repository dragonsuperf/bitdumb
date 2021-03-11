const {defaults} = require('jest-config');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setUpTests.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
