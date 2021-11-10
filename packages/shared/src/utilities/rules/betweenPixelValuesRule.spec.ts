/* (c) Copyright Frontify Ltd., all rights reserved. */

import { betweenPixelValuesRule } from './betweenPixelValuesRule';

describe('betweenPixelValuesRule', () => {
    const data = [
        { a: 1, b: 5, value: '4', expected: true },
        { a: 1, b: 5, value: '4px', expected: true },
        { a: 1, b: 5, value: '1', expected: true },
        { a: 1, b: 5, value: '1px', expected: true },
        { a: 1, b: 5, value: '5', expected: true },
        { a: 1, b: 5, value: '5px', expected: true },
        { a: 1, b: 5, value: '4rem', expected: false },
        { a: 1, b: 5, value: '10', expected: false },
        { a: 1, b: 5, value: '10px', expected: false },
        { a: 1, b: 5, value: '-1', expected: false },
        { a: 1, b: 5, value: '-1px', expected: false },
        { a: 1, b: 5, value: '10%', expected: false },
        { a: 1, b: 5, value: '-1%', expected: false },
        { a: 1, b: 5, value: '2%', expected: false },
        { a: 1, b: 5, value: 'auto', expected: false },
    ];

    it.each(data)('validate correctly values', ({ a, b, value, expected }) => {
        const rule = betweenPixelValuesRule(a, b);
        expect(rule.validate(value)).toBe(expected);
    });
});
