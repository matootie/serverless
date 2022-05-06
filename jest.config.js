/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig")

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  rootDir: ".",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
    "^jose/(.*)": "<rootDir>/node_modules/jose/dist/node/cjs/$1",
  },
  setupFiles: ["<rootDir>/test/env.ts"],
}
