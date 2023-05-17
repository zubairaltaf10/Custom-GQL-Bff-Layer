module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!src/declarations/**/*', '!test'],
  preset: 'ts-jest',
  setupFiles: ['./test/setup.ts'],
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['node_modules'],
};
