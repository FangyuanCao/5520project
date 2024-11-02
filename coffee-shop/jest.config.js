module.exports = {
  rootDir: '../',
  testMatch: ['<rootDir>/ButtonAndRouter.test.js', '**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/coffee-shop/src/setupTests.js'],
  // Set up the test environment
  testEnvironment: 'jsdom',
  // Import the Babel pack
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Mock irelevent picture files
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/coffee-shop/src/__mocks__/fileMock.js',
  },
  // Config the test report
  //reporters: [
  //  'default',
  //  ['jest-html-reporter', {
  //    pageTitle: 'Test Report'
  //  }]
  //],
  // Config the coverage rate report 
  collectCoverage: true,
  coverageDirectory: 'coffee-shop/coverage',
  coverageReporters: ['html', 'text'],
};
