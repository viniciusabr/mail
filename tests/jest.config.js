export default {
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,            // restaura spies e mocks automaticamente
  verbose: true,                 // mostra todos os testes individualmente
  testLocationInResults: true,   // mostra de onde vem cada teste
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/config/',
  ],
};
