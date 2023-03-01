/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColorLevel, SquareBadgesProps } from '../types';
import { IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { toHexString } from '@frontify/guideline-blocks-shared';
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

    const lastBadgeWidth = (lastLevelColors.color?.name?.length || 0) * 6 + 90;
    const previousWithPercent = (lastBadgeWidth / width) * 100;
    const previousEndPosition = lastLevelColors.position + previousWithPercent;

    let currentLevel = level;
    if (previousEndPosition > currentColor.position) {
        currentLevel = getTopLevel(gradientColors, index, width, level + 1);
    }
    return currentLevel;
};

export const SquareBadges = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesProps) => {
    const { copy, status } = useCopy();
    const [highestLevel, setHighestLevel] = useState(0);
    const isCopied = status === 'success';
    const gradientColorLevel = gradientColors as GradientColorLevel[];

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

    const getLeft = (position: number, index: number) => {
        if (gradientOrientation === 90) {
            if (index === 0) {
                return `${0}%`;
            }
            return `${position}%`;
        } else {
            return `${0}%`;
        }
    };

    const getTop = (level: number, index: number) => {
        if (gradientOrientation === 90) {
            return level * HEIGHT_OF_SQUARE_BADGE;
        } else {
            return HEIGHT_OF_SQUARE_BADGE * index;
        }
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
                        left: getLeft(gradientColor.position, index),
                        top: getTop(gradientColor.level, index),
                    }}
                >
                    <div className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group">
                        <div
                            className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[1px]"
                            style={{
                                backgroundColor: toHexString(gradientColor.color),
                            }}
                        ></div>
                        <span className="tw-text-weak tw-pl-[5px] tw-pr-[5px] tw-text-xs">
                            <strong>{gradientColor.color?.name}</strong>
                        </span>
                        <span className="tw-text-x-weak tw-text-xs tw-pr-[5px]">
                            {toHexString(gradientColor.color)}
                        </span>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                            onClick={() => copy(toHexString(gradientColor.color))}
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
