/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line 
const { jsWithTsESM } = require("ts-jest/presets");

const jestConfig = {
  roots: ["<rootDir>/server"],
  testMatch: ["**/__tests__/**/*.+(ts)", "**/?(*.)+(spec|test).+(ts)"],
  setupFilesAfterEnv: ["./server/mocks/db.ts"],
  transform: {
    ...jsWithTsESM.transform,
  },
};

// eslint-disable-next-line
module.exports = jestConfig;
