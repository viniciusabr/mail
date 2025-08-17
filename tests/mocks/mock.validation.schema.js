import { jest } from '@jest/globals';

export const mockValidationSchema = async (isValid = true) => {
  jest.unstable_mockModule('../../../src/app/validations/auth.validation.js', () => ({
    registerSchema: {
      validate: jest.fn().mockReturnValue(isValid ? {} : { error: { details: [{ message: '"email" is required' }] } })
    },
    loginSchema: {
      validate: jest.fn().mockReturnValue(isValid ? {} : { error: { details: [{ message: '"password" is required' }] } })
    },
  }));
};

