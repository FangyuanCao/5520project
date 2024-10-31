module.exports = {
  rootDir: '../',
  testMatch: ['<rootDir>/ButtonAndRouter.test.js'],
  setupFilesAfterEnv: ['<rootDir>/coffee-shop/src/setupTests.js'],
  // Indicate the matching mode of the test file
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  // Set up the test environment
  testEnvironment: 'jsdom',
  // Import the Babel pack
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Mock irelevent picture files
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  // Config the test report
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report'
    }]
  ],
  // Config the coverage rate report 
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
};
