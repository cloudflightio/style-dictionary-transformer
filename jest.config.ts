import type { Config } from 'jest';

const jestConfig: Config = {
    preset: 'ts-jest/presets/default',
    testEnvironment: 'node',
    roots: ['./src/'],
};

export default jestConfig;
