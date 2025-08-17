// tests/mocks/http.mock.js
import { jest } from '@jest/globals';
import { userPayload } from '../factories/user.factory';

export const makeReq = (overrides = {}) => ({
  body: userPayload(overrides),
  params: {},
  query: {},
  headers: {},
});

export const makeRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

export const makeNext = () => jest.fn();
