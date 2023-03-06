/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { GradientColor } from '../types';
import {
    calculateBadgeWidthInPercent,
    calculateCopyButtonWidthInPercent,
    getTopLevel,
    isBadgeLeft,
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

describe('SquareBadgeHelper', () => {
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
                level: 2,
            },
            {
                color: Color,
                position: 100,
                level: 0,
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
                level: 3,
            },
            {
                color: Color,
                position: 44,
            },
            {
                color: Color,
                position: 100,
                level: 0,
            },
        ];
        expect(getTopLevel(gradientColorsSeventhLevelMissing, 7, 800, 0)).toEqual(3);
    });
});
