import { jest } from '@jest/globals';

const SPEC = '../../../src/config/logger.js';

export const mockLogger = async () => {
  const spies = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
  jest.unstable_mockModule(SPEC, () => ({ default: spies }));
  // não faça import() aqui — desnecessário e causa erro de path
  return spies; // use esses spies nos expects
};
