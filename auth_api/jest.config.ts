import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  rootDir: "./",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  coverageDirectory: "./coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: {
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@fixtures/(.*)$": "<rootDir>/src/fixtures/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/types/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
  },
};

export default config;
