/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type GradientColor } from '../types';

import {
    calculateBadgeWidthInPercent,
    calculateCopyButtonWidthInPercent,
    calculateLevelOfLast,
    getTopLevel,
    isBadgeLeft,
    prepareGradientColors,
} from './SquareBadgeHelper';

const Color = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
};

const GradientColorDefault = {
    color: Color,
    position: 0,
} as GradientColor;

const GradientColorWhite = {
    color: {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
        name: 'White',
    },
    position: 0,
} as GradientColor;

const simpleSamleGradientColors = [
    {
        color: Color,
        position: 0,
    },
    {
        color: Color,
        position: 100,
    },
];

const preparedSimpleSamleGradientColors = [
    {
        color: Color,
        position: 0,
        level: 0,
        isReverse: false,
    },
    {
        color: Color,
        position: 100,
        level: 0,
        isReverse: true,
    },
];

const preparedSixColorsAtEnd = [
    {
        color: Color,
        position: 0,
        level: 0,
        isReverse: false,
    },
    {
        color: Color,
        position: 96,
        level: 0,
        isReverse: true,
    },
    {
        color: Color,
        position: 97,
        level: 1,
        isReverse: true,
    },
    {
        color: Color,
        position: 98,
        level: 2,
        isReverse: true,
    },
    {
        color: Color,
        position: 99,
        level: 3,
        isReverse: true,
    },
    {
        color: Color,
        position: 100,
        isReverse: true,
    },
];

describe('SquareBadgeHelper', () => {
    it('calculateLevelOfLast with 2 colors level is 0', () => {
        expect(calculateLevelOfLast(preparedSimpleSamleGradientColors)).toEqual(0);
    });

    it('calculateLevelOfLast with 6 colors level is 4', () => {
        expect(calculateLevelOfLast(preparedSixColorsAtEnd)).toEqual(4);
    });

    it('calculateBadgeWidthInPercent width is 12.5 at 800', () => {
        expect(calculateBadgeWidthInPercent(GradientColorDefault, 800)).toEqual(12.5);
    });

    it('calculateBadgeWidthInPercent width is 10 at 1000', () => {
        expect(calculateBadgeWidthInPercent(GradientColorDefault, 1000)).toEqual(10);
    });

    it('calculateBadgeWidthInPercent width with White is 16.25 at 800', () => {
        expect(calculateBadgeWidthInPercent(GradientColorWhite, 800)).toEqual(16.25);
    });

    it('calculateCopyButtonWidthInPercent width is 2 at 800', () => {
        expect(calculateCopyButtonWidthInPercent(800)).toEqual(2);
    });

    it('calculateCopyButtonWidthInPercent width is 1.6 at 1000', () => {
        expect(calculateCopyButtonWidthInPercent(1000)).toEqual(1.6);
    });

    it('calculateCopyButtonWidthInPercent width is 4 at 400', () => {
        expect(calculateCopyButtonWidthInPercent(400)).toEqual(4);
    });

    it('isBadgeLeft is true if position is 100', () => {
        const gradientColor = {
            color: Color,
            position: 100,
        } as GradientColor;
        expect(isBadgeLeft(gradientColor, 800)).toEqual(true);
    });

    it('isBadgeLeft is false if position is 0', () => {
        expect(isBadgeLeft(GradientColorDefault, 800)).toEqual(false);
    });

    it('isBadgeLeft is false if position is 85', () => {
        const gradientColor = {
            color: Color,
            position: 85,
        } as GradientColor;
        expect(isBadgeLeft(gradientColor, 800)).toEqual(false);
    });

    it('getTopLevel is 0 if index is 0 array is empty', () => {
        expect(getTopLevel([], 0, 800, 0)).toEqual(0);
    });

    it('getTopLevel is 0 if index is 0', () => {
        const gradientColors = [
            {
                color: Color,
                position: 0,
            },
        ];
        expect(getTopLevel(gradientColors, 0, 800, 0)).toEqual(0);
    });

    it('getTopLevel is 2 if index is 2', () => {
        const gradientColorsSecondLevelMissing = [
            {
                color: Color,
                position: 0,
                level: 0,
            },
            {
                color: Color,
                position: 2,
                level: 1,
            },
            {
                color: Color,
                position: 7,
            },
            {
                color: Color,
                position: 100,
            },
        ];
        expect(getTopLevel(gradientColorsSecondLevelMissing, 2, 800, 0)).toEqual(2);
    });

    it('getTopLevel is 3 if index is 7 after resetting the level after the first Colors', () => {
        const gradientColorsSeventhLevelMissing = [
            {
                color: Color,
                position: 0,
                level: 0,
            },
            {
                color: Color,
                position: 2,
                level: 1,
            },
            {
                color: Color,
                position: 7,
                level: 2,
            },
            {
                color: Color,
                position: 7,
                level: 3,
            },
            {
                color: Color,
                position: 40,
                level: 0,
            },
            {
                color: Color,
                position: 41,
                level: 1,
            },
            {
                color: Color,
                position: 42,
                level: 2,
            },
            {
                color: Color,
                position: 43,
            },
            {
                color: Color,
                position: 44,
            },
            {
                color: Color,
                position: 100,
            },
        ];
        expect(getTopLevel(gradientColorsSeventhLevelMissing, 7, 800, 0)).toEqual(3);
    });

    it('prepareGradientColors is called with 2 colors', () => {
        expect(prepareGradientColors(simpleSamleGradientColors, 800)).toEqual(preparedSimpleSamleGradientColors);
    });

    it('prepareGradientColors is called with multiple colors, multiple levels, multiple reverse', () => {
        const gradientColors = [
            {
                color: Color,
                position: 0,
            },
            {
                color: Color,
                position: 2,
            },
            {
                color: Color,
                position: 7,
            },
            {
                color: Color,
                position: 25,
            },
            {
                color: Color,
                position: 40,
            },
            {
                color: Color,
                position: 92,
            },
            {
                color: Color,
                position: 93,
            },
            {
                color: Color,
                position: 94,
            },
            {
                color: Color,
                position: 95,
            },
            {
                color: Color,
                position: 100,
            },
        ];

        const gradientColorsPrepared = [
            {
                color: Color,
                position: 0,
                level: 0,
                isReverse: false,
            },
            {
                color: Color,
                position: 2,
                level: 1,
                isReverse: false,
            },
            {
                color: Color,
                position: 7,
                level: 2,
                isReverse: false,
            },
            {
                color: Color,
                position: 25,
                level: 0,
                isReverse: false,
            },
            {
                color: Color,
                position: 40,
                level: 0,
                isReverse: false,
            },
            {
                color: Color,
                position: 92,
                level: 0,
                isReverse: true,
            },
            {
                color: Color,
                position: 93,
                level: 1,
                isReverse: true,
            },
            {
                color: Color,
                position: 94,
                level: 2,
                isReverse: true,
            },
            {
                color: Color,
                position: 95,
                level: 3,
                isReverse: true,
            },
            {
                color: Color,
                position: 100,
                level: 4,
                isReverse: true,
            },
        ];
        expect(prepareGradientColors(gradientColors, 800)).toEqual(gradientColorsPrepared);
    });
});
