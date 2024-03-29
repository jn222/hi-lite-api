const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: ["**/controllers/**", "**/interfaces/**", "**/services/**"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  setupFilesAfterEnv: ["<rootDir>/src/test/singleton.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src" }),
  clearMocks: true
}
