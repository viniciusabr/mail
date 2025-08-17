import { jest } from '@jest/globals';

export const mockAuthService = () => {
  jest.unstable_mockModule('../../../src/app/services/auth.service.js', () => ({
    register: jest.fn().mockResolvedValue({
      user: { get: () => ({ id: '1', email: 'teste@linx.com.br', password_hash: 'x' }) },
      token: 'tkn'
    }),
    login: jest.fn(),
  }));

};
