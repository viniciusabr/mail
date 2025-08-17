import { faker } from '@faker-js/faker';

export function userPayload(overrides = {}) {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    ...overrides,
  };
}
