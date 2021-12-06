/* (c) Copyright Frontify Ltd., all rights reserved. */

import { minimumNumericalOrPercentOrAutoRule } from './minimumNumericalOrPercentOrAutoRule';

describe('minimumNumericalOrPercentOrAutoRule', () => {
    const data = [
        { minimumValue: 5, includeAuto: true, value: '6', expected: true },
        { minimumValue: 5, includeAuto: true, value: '5', expected: true },
        { minimumValue: 5, includeAuto: true, value: 'auto', expected: true },
        { minimumValue: 5, includeAuto: false, value: 'auto', expected: false },
        { minimumValue: 5, includeAuto: true, value: '6%', expected: true },
        { minimumValue: 5, includeAuto: true, value: '5%', expected: true },
        { minimumValue: 5, includeAuto: true, value: '10', expected: true },
        { minimumValue: 5, includeAuto: true, value: '100%', expected: true },
        { minimumValue: 5, includeAuto: true, value: '6px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '5px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '10px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '1%', expected: false },
        { minimumValue: 5, includeAuto: true, value: '-1', expected: false },
        { minimumValue: 5, includeAuto: true, value: '4', expected: false },
        { minimumValue: 5, includeAuto: true, value: '1', expected: false },
        { minimumValue: 5, includeAuto: true, value: '%', expected: false },
        { minimumValue: 5, includeAuto: true, value: '4px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '1px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '5px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '4rem', expected: false },
        { minimumValue: 5, includeAuto: true, value: '-1px', expected: false },
        { minimumValue: 5, includeAuto: true, value: ' 10px', expected: false },
        { minimumValue: 5, includeAuto: true, value: '', expected: false },
        { minimumValue: 5, includeAuto: true, value: 'abc', expected: false },
        { minimumValue: 5, includeAuto: true, value: 'px', expected: false },
        { minimumValue: 5, includeAuto: true, value: 'rem', expected: false },
    ];

    it.each(data)(
        'validate correctly values (minimum value $minimumValue, includeAuto $includeAuto, value $value, expected $expected)',
        ({ minimumValue, includeAuto, value, expected }) => {
            const rule = minimumNumericalOrPercentOrAutoRule(minimumValue, includeAuto);
            expect(rule.validate(value)).toBe(expected);
        }
    );
});
