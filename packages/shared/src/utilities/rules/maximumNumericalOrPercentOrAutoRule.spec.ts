/* (c) Copyright Frontify Ltd., all rights reserved. */

import { maximumNumericalOrPercentOrAutoRule } from './maximumNumericalOrPercentOrAutoRule';

describe('maximumNumericalOrPercentOrAutoRule', () => {
    const data = [
        { maximumValue: 5, includeAuto: true, value: '4', expected: true },
        { maximumValue: 5, includeAuto: true, value: '1', expected: true },
        { maximumValue: 5, includeAuto: true, value: '5', expected: true },
        { maximumValue: 5, includeAuto: true, value: '4%', expected: true },
        { maximumValue: 5, includeAuto: true, value: '1%', expected: true },
        { maximumValue: 5, includeAuto: true, value: '5%', expected: true },
        { maximumValue: 5, includeAuto: true, value: '-1', expected: true },
        { maximumValue: 5, includeAuto: true, value: 'auto', expected: true },
        { maximumValue: 5, includeAuto: false, value: 'auto', expected: false },
        { maximumValue: 5, includeAuto: true, value: '-1%', expected: true },
        { maximumValue: 5, includeAuto: true, value: '1%', expected: true },
        { maximumValue: 5, includeAuto: true, value: '4px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '1px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '5px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '%', expected: false },
        { maximumValue: 5, includeAuto: true, value: '100%', expected: false },
        { maximumValue: 5, includeAuto: true, value: '4px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '5px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '4rem', expected: false },
        { maximumValue: 5, includeAuto: true, value: '-1px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '10', expected: false },
        { maximumValue: 5, includeAuto: true, value: '10px', expected: false },
        { maximumValue: 5, includeAuto: true, value: ' 10px', expected: false },
        { maximumValue: 5, includeAuto: true, value: '', expected: false },
        { maximumValue: 5, includeAuto: true, value: 'abc', expected: false },
        { maximumValue: 5, includeAuto: true, value: 'px', expected: false },
        { maximumValue: 5, includeAuto: true, value: 'rem', expected: false },
    ];

    it.each(data)(
        'validate correctly values (maximum value $maximumValue, includeAuto $includeAuto, value $value, expected $expected)',
        ({ maximumValue, includeAuto, value, expected }) => {
            const rule = maximumNumericalOrPercentOrAutoRule(maximumValue, includeAuto);
            expect(rule.validate(value)).toBe(expected);
        }
    );
});
