/* (c) Copyright Frontify Ltd., all rights reserved. */

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
            it(`generates the correct output for preprocessor: ${testItem.input}`, () => {
                const result = getCssExtension(testItem.input);
                cy.wrap(result.extension).should('eq', testItem.output.extension);
                cy.wrap(result.label).should('eq', testItem.output.label);
            });
        }
    });
});
