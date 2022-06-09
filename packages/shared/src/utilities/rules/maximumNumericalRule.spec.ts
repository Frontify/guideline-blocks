/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { maximumNumericalRule } from './maximumNumericalRule';

describe('maximumNumericalRule', () => {
    const data = [
        { maximumValue: 5, value: '4', expected: true },
        { maximumValue: 5, value: '1', expected: true },
        { maximumValue: 5, value: '5', expected: true },
        { maximumValue: 5, value: '1px', expected: false },
        { maximumValue: 5, value: '', expected: false },
        { maximumValue: 5, value: '4px', expected: false },
        { maximumValue: 5, value: '-1', expected: true },
        { maximumValue: 5, value: 'auto', expected: false },
        { maximumValue: 5, value: '-1px', expected: false },
        { maximumValue: 5, value: '1%', expected: false },
        { maximumValue: 5, value: '-1%', expected: false },
        { maximumValue: 5, value: '%', expected: false },
        { maximumValue: 5, value: '100%', expected: false },
        { maximumValue: 5, value: '4rem', expected: false },
        { maximumValue: 5, value: '10', expected: false },
        { maximumValue: 5, value: '10px', expected: false },
        { maximumValue: 5, value: ' 10px', expected: false },
        { maximumValue: 5, value: 'abc', expected: false },
        { maximumValue: 5, value: 'px', expected: false },
        { maximumValue: 5, value: 'rem', expected: false },
    ];

    test.each(data)(
        'validate correctly values (maximum value $maximumValue, value $value, expected $expected)',
        ({ maximumValue, value, expected }) => {
            const rule = maximumNumericalRule(maximumValue);
            expect(rule.validate(value)).toBe(expected);
        }
    );
});
