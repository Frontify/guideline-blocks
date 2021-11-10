/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'path';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    testMatch: [join(__dirname, './src/**/*.spec.ts')],
};

export default config;
