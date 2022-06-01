/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { minimumPixelRule } from './minimumPixelRule';

describe('minimumPixelRule', () => {
    const data = [
        { minimumValue: 5, value: '10', expected: false },
        { minimumValue: 5, value: '10px', expected: true },
        { minimumValue: 5, value: '5', expected: false },
        { minimumValue: 5, value: '5px', expected: true },
        { minimumValue: 5, value: 'auto', expected: false },
        { minimumValue: 5, value: '-1', expected: false },
        { minimumValue: 5, value: '-1px', expected: false },
        { minimumValue: 5, value: '4rem', expected: false },
        { minimumValue: 5, value: '4', expected: false },
        { minimumValue: 5, value: '4px', expected: false },
        { minimumValue: 5, value: '1', expected: false },
        { minimumValue: 5, value: '1px', expected: false },
        { minimumValue: 5, value: '1%', expected: false },
        { minimumValue: 5, value: '100%', expected: false },
        { minimumValue: 5, value: ' 10px', expected: false },
        { minimumValue: 5, value: '', expected: false },
        { minimumValue: 5, value: 'abc', expected: false },
        { minimumValue: 5, value: 'px', expected: false },
        { minimumValue: 5, value: 'rem', expected: false },
    ];

    test.each(data)(
        'validate correctly values (minimum value $minimumValue, value $value, expected $expected)',
        ({ minimumValue, value, expected }) => {
            const rule = minimumPixelRule(minimumValue);
            expect(rule.validate(value)).toBe(expected);
        }
    );
});
