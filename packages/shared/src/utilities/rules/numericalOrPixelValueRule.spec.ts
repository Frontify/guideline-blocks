/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalOrPixelValueRule } from './numericalOrPixelValueRule';

describe('numericalOrPixelValueRule', () => {
    const data = [
        { value: '4', expected: true },
        { value: '4px', expected: true },
        { value: '1', expected: true },
        { value: '1px', expected: true },
        { value: '5', expected: true },
        { value: '5px', expected: true },
        { value: '4rem', expected: false },
        { value: '10', expected: true },
        { value: '10px', expected: true },
        { value: '-1', expected: true },
        { value: '-1px', expected: true },
        { value: ' 10px', expected: false },
        { value: '', expected: false },
        { value: 'abc', expected: false },
        { value: 'px', expected: false },
        { value: 'rem', expected: false },
    ];

    it.each(data)('validate correctly values', ({ value, expected }) => {
        expect(numericalOrPixelValueRule.validate(value)).toBe(expected);
    });
});
