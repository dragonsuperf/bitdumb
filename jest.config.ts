import { defaults } from 'jest-config';

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setUpTests.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
