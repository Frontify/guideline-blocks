/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColor } from '../types';

export const getTopLevel = (gradientColors: GradientColor[], index: number, width: number, level: number): number => {
    if (!index) {
        return 0;
    }

    const currentColor = gradientColors[index];
    const allColorsOnLevel = gradientColors.filter(
        (color) => color.level === level && color.position < currentColor.position
    );

    const lastLevelColors = allColorsOnLevel[allColorsOnLevel.length - 1];
    if (!lastLevelColors) {
        return level;
    }

    const previousWithPercent = calculateBadgeWidthInPercent(lastLevelColors, width);
    const previousEndPosition = lastLevelColors.position + previousWithPercent;

    let currentLevel = level;
    if (previousEndPosition > currentColor.position) {
        currentLevel = getTopLevel(gradientColors, index, width, level + 1);
    }

    return currentLevel;
};

export const calculateBadgeWidthInPercent = (color: GradientColor, width: number) => {
    const badgeWidth = (color.color?.name?.length || 0) * 6 + 100;
    return (badgeWidth / width) * 100;
};

export const calculateCopyButtonWidthInPercent = (width: number) => {
    return (16 / width) * 100;
};

export const isBadgeLeft = (color: GradientColor, width: number) => {
    const badgeWidthPercent = calculateBadgeWidthInPercent(color, width);
    return color.position + badgeWidthPercent > 100;
};
