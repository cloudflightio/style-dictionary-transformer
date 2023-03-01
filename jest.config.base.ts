import type { Config } from 'jest';

export const baseJestConfig: Config = {
    preset: 'ts-jest/presets/default',
    testEnvironment: 'node',
    roots: ['./src/'],
};
