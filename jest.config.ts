import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: '@happy-dom/jest-environment',
  coverageDirectory: 'coverage',
}

export default config
