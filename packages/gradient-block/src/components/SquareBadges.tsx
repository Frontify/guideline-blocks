/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColor, SquareBadgesProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';

export const SquareBadges = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesProps) => {
    const { copy, status } = useCopy();
    const [highestLevel, setHighestLevel] = useState(0);
    const isCopied = status === 'success';

    const prepareGradients = () => {
        for (const [index, color] of gradientColors.entries()) {
            color.isLeft = isBadgeLeft(gradientColors[index], blockWidth);
            color.level = getTopLevel(gradientColors, index, blockWidth, 0);
        }

        const allLeft = gradientColors.filter((color) => color.isLeft);
        const rightHighestLevel =
            gradientColors.reduce((prev, current) => {
                return (prev.level || 0) > (current.level || 0) ? prev : current;
            }).level || 0;

        setHighestLevel(Math.max(allLeft.length - 1, rightHighestLevel));
    };

    const getHeight = () => {
        if (gradientOrientation === 90) {
            return HEIGHT_OF_SQUARE_BADGE * highestLevel + 1;
        }
        return HEIGHT_OF_SQUARE_BADGE * (gradientColors?.length || 0);
    };

    const getTop = (gradientColor: GradientColor, index: number) => {
        if (gradientColor.level) {
            if (gradientOrientation === 90) {
                return gradientColor.level * HEIGHT_OF_SQUARE_BADGE;
            } else {
                return HEIGHT_OF_SQUARE_BADGE * index;
            }
        } else {
            return 0;
        }
    };

    const getRight = (gradientColor: GradientColor) => {
        if (gradientColor.isLeft && gradientOrientation === 90) {
            return 0;
        } else {
            return 'auto';
        }
    };

    const getBadgeClasses = (isLeft: boolean) => {
        return joinClassNames([
            'tw-flex',
            isLeft && gradientOrientation === 90 ? 'tw-flex-row-reverse tw-pl-1' : 'tw-pr-1',
        ]);
    };

    const getLeft = (gradientColor: GradientColor) => {
        if (gradientOrientation === 90) {
            if (gradientColor.isLeft) {
                return 'auto';
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
                <div
                    key={toHexString(gradientColor.color) + gradientColor.position}
                    className="tw-absolute tw-mt-2"
                    style={{
                        left: getLeft(gradientColor),
                        top: getTop(gradientColor, index),
                        right: getRight(gradientColor),
                    }}
                >
                    <div
                        className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group tw-cursor-pointer"
                        onClick={() => copy(toHexString(gradientColor.color))}
                    >
                        <div className={getBadgeClasses(gradientColor.isLeft || false)}>
                            <div
                                className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-mx-0."
                                style={{
                                    backgroundColor: toHexString(gradientColor.color),
                                }}
                            ></div>
                            <span className="tw-text-weak tw-px-1 tw-text-xs">
                                <strong>{gradientColor.color?.name}</strong>
                            </span>
                            <span className="tw-text-x-weak tw-text-xs tw-pl-1">
                                {toHexString(gradientColor.color)}
                            </span>
                        </div>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pr-1 tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                        >
                            {isCopied ? <IconCheckMark16 /> : <IconClipboard16 />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

SquareBadges.displayName = 'SquareBadges';

const getTopLevel = (gradientColors: GradientColor[], index: number, width: number, level: number): number => {
    if (!index) {
        return 0;
    }

    const currentColor = gradientColors[index];
    const allColorsOnLevel = gradientColors.filter(
        (color) => color.level === level && color.position < currentColor.position
    );

    const lastLevelColors = allColorsOnLevel[allColorsOnLevel.length - 1];
    if (lastLevelColors === undefined) {
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
    const badgeWidth = (color.color.name?.length || 0) * 6 + 100;
    return (badgeWidth / width) * 100;
};

const isBadgeLeft = (color: GradientColor, width: number) => {
    const badgeWidthPercent = getBadgeWidthInPercent(color, width);
    return color.position + badgeWidthPercent > 100 - badgeWidthPercent;
};
