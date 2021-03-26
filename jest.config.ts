import { defaults } from 'jest-config';

module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setUpTests.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
