/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverage: false,
};
