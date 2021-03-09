module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/mocks/'],
  testPathIgnorePatterns: ['/.next/', '/node_modules'],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/__tests__/mocks/emptyMock.js',
  },
  collectCoverageFrom: ['pages/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      functions: 100,
      lines: 100,
      branches: 100,
      statements: 100,
    },
  },
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: ['cobertura', 'lcov', 'text', 'text-summary'],
  rootDir: '.',
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: 'tsconfig.test.json',
    },
  },
};
