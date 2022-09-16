module.exports = {
  displayName: '@yonycalsin/react-typescript-vite-starter',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.{ts,tsx}'],
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}
