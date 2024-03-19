/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { transformDateStringToDate } from './assetKitHelpers';

describe('transformDateStringToDate', () => {
    const testCases = [
        {
            input: '20240204T123044Z',
            output: new Date('2024-02-04T12:30:44Z'),
        },
        {
            input: '20241231T000000Z',
            output: new Date('2024-12-31T00:00:00Z'),
        },
    ];
    for (const testCase of testCases) {
        it('should return the correct output', () => {
            expect(transformDateStringToDate(testCase.input).getTime()).toBe(testCase.output.getTime());
        });
    }
    it('should return invalid date for invalid input', () => {
        expect(transformDateStringToDate('invalid-input').getTime()).toBe(NaN);
    });
});
