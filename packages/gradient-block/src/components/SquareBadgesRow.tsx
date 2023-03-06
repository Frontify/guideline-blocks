/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColor, SquareBadgesRowProps } from '../types';
import { useEffect, useState } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { SquareBadge } from './SquareBadge';
import { toHexString } from '@frontify/guideline-blocks-shared';

export const SquareBadgesRow = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesRowProps) => {
    const [highestLevel, setHighestLevel] = useState(0);

    const prepareGradients = () => {
        for (const [index, color] of gradientColors.entries()) {
            color.isReverse = isBadgeLeft(color, blockWidth);
            color.level = getTopLevel(gradientColors, index, blockWidth, 0);
        }

        const allLeft = gradientColors.filter((color) => color.isReverse);
        const rightHighestLevel =
            gradientColors.reduce((prev, current) => {
                return (prev.level || 0) > (current.level || 0) ? prev : current;
            }).level || 0;

        const leftStartLevel = allLeft[0].level || 0;

        gradientColors[gradientColors.length - 1].level = leftStartLevel + allLeft.length - 1;
        setHighestLevel(Math.max(allLeft.length + leftStartLevel, rightHighestLevel));
    };

    const getHeight = () => {
        if (gradientOrientation === 90) {
            return HEIGHT_OF_SQUARE_BADGE * highestLevel + 1;
        }
        return HEIGHT_OF_SQUARE_BADGE * (gradientColors?.length || 0);
    };

    const getTop = (gradientColor: GradientColor, index: number) => {
        if (gradientColor.level !== undefined) {
            if (gradientOrientation === 90) {
                return gradientColor.level * HEIGHT_OF_SQUARE_BADGE;
            } else {
                return HEIGHT_OF_SQUARE_BADGE * index;
            }
        } else {
            return 0;
        }
    };

    const getLeft = (gradientColor: GradientColor) => {
        if (gradientOrientation === 90) {
            if (gradientColor.isReverse) {
                const badgeWidthInPercent = getBadgeWidthInPercent(gradientColor, blockWidth);
                const copyButtonInPercent = getCopyButtonWidthInPercent(blockWidth);
                return `${gradientColor.position - (badgeWidthInPercent - copyButtonInPercent) + 2}%`;
            } else {
                return `${gradientColor.position}%`;
            }
        } else {
            return '0%';
        }
    };

    useEffect(() => {
        prepareGradients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="tw-relative tw-w-full"
            style={{
                height: getHeight(),
            }}
        >
            {gradientColors.map((gradientColor, index) => (
                <SquareBadge
                    key={toHexString(gradientColor.color) + gradientColor.position}
                    gradientColor={gradientColor}
                    left={getLeft(gradientColor)}
                    top={getTop(gradientColor, index)}
                    gradientOrientation={gradientOrientation}
                />
            ))}
        </div>
    );
};

const getTopLevel = (gradientColors: GradientColor[], index: number, width: number, level: number): number => {
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

    const previousWithPercent = getBadgeWidthInPercent(lastLevelColors, width);
    const previousEndPosition = lastLevelColors.position + previousWithPercent;

    let currentLevel = level;
    if (previousEndPosition > currentColor.position) {
        currentLevel = getTopLevel(gradientColors, index, width, level + 1);
    }

    return currentLevel;
};

const getBadgeWidthInPercent = (color: GradientColor, width: number) => {
    const badgeWidth = (color.color?.name?.length || 0) * 6 + 100;
    return (badgeWidth / width) * 100;
};

const getCopyButtonWidthInPercent = (width: number) => {
    return (16 / width) * 100;
};

const isBadgeLeft = (color: GradientColor, width: number) => {
    const badgeWidthPercent = getBadgeWidthInPercent(color, width);
    return color.position + badgeWidthPercent > 100;
};
