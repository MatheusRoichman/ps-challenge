import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Required to use TypeScript
  rootDir: '../', // Required to denote the root directory of the app because our configuration file is not in the root folder
  setupFilesAfterEnv: ["./config/jest.setup.ts"], // Used to setup imports that will be used within most/all tests
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: { // Required to transform the css files and prevent parsing errors when running our tests
      "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
      // configure import alias (@/) to point to the src directory
      "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom", // Required to set the test environment to jsdom, this is the default test environment for Jest
  verbose: true, // I like my tests to be verbose, it gives me a better picture of what’s going on
  collectCoverage: true, // I also like to monitor the amount of code my tests cover
};

export default config;
