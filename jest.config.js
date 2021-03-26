module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  reporters: [
    "default",
    [ "jest-junit", {
      suiteName: "HRA11Y",
      outputDirectory: "./a11y-results",
      outputName: "test-results.xml",
    } ]
  ]
}