/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColorLevel, SquareBadgesProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';

const getTopLevel = (gradientColors: GradientColorLevel[], index: number, width: number, level: number): number => {
    if (index === 0) {
        return 0;
    }

    const currentColor = gradientColors[index];
    const allColorsOnLevel = gradientColors.filter(
        (color) => color.level === level && color.position < currentColor.position
    );

    if (allColorsOnLevel.length <= 0) {
        return level;
    }

    const lastLevelColors = allColorsOnLevel[allColorsOnLevel.length - 1];
    if (lastLevelColors === undefined) {
        return level;
    }

    const lastBadgeWidth = getBadgeWidth(lastLevelColors);
    const previousWithPercent = (lastBadgeWidth / width) * 100;
    const previousEndPosition = lastLevelColors.position + previousWithPercent;

    let currentLevel = level;
    if (previousEndPosition > currentColor.position) {
        currentLevel = getTopLevel(gradientColors, index, width, level + 1);
    }
    return currentLevel;
};

const getBadgeWidth = (color: GradientColorLevel) => {
    return (color.color.name?.length || 0) * 6 + 90;
};

const isBadgeLeft = (color: GradientColorLevel, width: number) => {
    const badgeWidth = getBadgeWidth(color);
    const badgeWidthPercent = (badgeWidth / width) * 100;
    if (color.position + badgeWidthPercent > 100 - badgeWidthPercent) {
        return true;
    }
    return false;
};

export const SquareBadges = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesProps) => {
    const { copy, status } = useCopy();
    const [highestLevel, setHighestLevel] = useState(0);
    const gradientColorLevel = gradientColors as GradientColorLevel[];
    const isCopied = status === 'success';

    const setLevel = () => {
        for (let i = 0; i < gradientColorLevel.length; i++) {
            gradientColorLevel[i].level = getTopLevel(gradientColorLevel, i, blockWidth, 0);
        }
        setHighestLevel(
            gradientColorLevel.reduce((prev, current) => (prev.level > current.level ? prev : current)).level
        );
    };

    const getHeight = () => {
        if (gradientOrientation === 90) {
            return HEIGHT_OF_SQUARE_BADGE * highestLevel + 1;
        }
        return HEIGHT_OF_SQUARE_BADGE * (gradientColors?.length || 0);
    };

    useEffect(() => {
        setLevel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLevel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradientColorLevel]);

    const getLeft = (gradientColor: GradientColorLevel) => {
        if (gradientOrientation === 90) {
            if (!isBadgeLeft(gradientColor, blockWidth)) {
                return `${gradientColor.position}%`;
            } else {
                return 'auto';
            }
        } else {
            return '0%';
        }
    };

    const getTop = (gradientColor: GradientColorLevel, index: number) => {
        if (gradientOrientation === 90) {
            return gradientColor.level * HEIGHT_OF_SQUARE_BADGE;
        } else {
            return HEIGHT_OF_SQUARE_BADGE * index;
        }
    };

    const getRight = (index: number) => {
        if (gradientOrientation !== 90 || isBadgeLeft(gradientColorLevel[index], blockWidth)) {
            return 0;
        } else {
            return 'auto';
        }
    };

    const getBadgeClasses = (isLeft: boolean) => {
        return joinClassNames(['tw-flex', isLeft ? 'tw-row-reverse tw-pl-1' : 'tw-pr-1']);
    };

    return (
        <div
            className="tw-relative tw-w-full"
            style={{
                height: getHeight(),
            }}
        >
            {gradientColorLevel.map((gradientColor, index) => (
                <div
                    key={toHexString(gradientColor.color) + gradientColor.position}
                    className="tw-absolute tw-mt-2"
                    style={{
                        left: getLeft(gradientColor),
                        top: getTop(gradientColor, index),
                        right: getRight(index),
                    }}
                >
                    <div
                        className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group tw-cursor-pointer"
                        onClick={() => copy(toHexString(gradientColor.color))}
                    >
                        <div className={getBadgeClasses(isBadgeLeft(gradientColor, blockWidth))}>
                            <div
                                className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-mx-[1px]"
                                style={{
                                    backgroundColor: toHexString(gradientColor.color),
                                }}
                            ></div>
                            <span className="tw-text-weak tw-px-1 tw-text-xs">
                                <strong>{gradientColor.color?.name}</strong>
                            </span>
                            <span className="tw-text-x-weak tw-text-xs tw-pl-[5px]">
                                {toHexString(gradientColor.color)}
                            </span>
                        </div>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
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
