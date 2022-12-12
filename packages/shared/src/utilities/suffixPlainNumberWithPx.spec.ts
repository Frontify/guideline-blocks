/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { suffixPlainNumberWithPx } from './suffixPlainNumberWithPx';

describe('suffix plain numbers with px', () => {
    it.each([
        ['10', '10px'],
        ['0', '0px'],
        ['999999', '999999px'],
        ['10rem', '10rem'],
        ['auto', 'auto'],
        ['asdfasdf', 'asdfasdf'],
        ['', '0px'],
    ])('items are suffixed accordingly', (input, expected) => {
        expect(expected).toEqual(suffixPlainNumberWithPx(input));
    });
});
