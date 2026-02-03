/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { AnimationCurveType } from '../types';

import { roundAnimationCurveParameters, roundTwoDecimals } from './animationCurve';

describe('round two decimals', () => {
    const testData = [
        { value: 0.123456789, expected: 0.12 },
        { value: 0.1256789, expected: 0.13 },
        { value: 0.1, expected: 0.1 },
    ];
    test.each(testData)('should round two decimals', ({ value, expected }) => {
        expect(roundTwoDecimals(value)).toBe(expected);
    });
});

describe('round animation curve parameters', () => {
    const testData = [
        {
            animationCurve: {
                id: '1',
                animationFunction: {
                    type: AnimationCurveType.Custom,
                    duration: 0.5,
                    parameters: {
                        x1: 0.654324,
                        x2: 0.123456789,
                        y1: 0.56723,
                        y2: 0.6,
                    },
                },
            },
            expected: {
                id: '1',
                animationFunction: {
                    type: AnimationCurveType.Custom,
                    duration: 0.5,
                    parameters: {
                        x1: 0.65,
                        x2: 0.12,
                        y1: 0.57,
                        y2: 0.6,
                    },
                },
            },
        },
    ];

    test.each(testData)('should round animation curve parameters', ({ animationCurve, expected }) => {
        expect(roundAnimationCurveParameters(animationCurve)).toEqual(expected);
    });
});
