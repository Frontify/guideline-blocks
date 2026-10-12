/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { Preprocessor } from '../types';

import { getCssExtension } from './files';

describe('files helpers', () => {
    describe('getCssExtension', () => {
        const testItems = [
            {
                input: Preprocessor.None,
                output: { label: 'CSS', extension: 'css' },
            },
            {
                input: Preprocessor.SCSS,
                output: { label: 'SCSS', extension: 'scss' },
            },
            {
                input: Preprocessor.LESS,
                output: { label: 'LESS', extension: 'less' },
            },
        ];

        for (const testItem of testItems) {
            it(`should generate the correct output for preprocessor: ${testItem.input}`, () => {
                const result = getCssExtension(testItem.input);
                expect(result.extension).toBe(testItem.output.extension);
                expect(result.label).toBe(testItem.output.label);
            });
        }
    });
});
