/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgeProps } from '../types';
import { Color, IconCheckMark16, IconClipboard16, useCopy } from '@frontify/fondue';
import { toHexString } from '@frontify/guideline-blocks-shared';
import { forwardRef, useEffect, useState } from 'react';

export type GradientColorLevel = {
    color: Color;
    position: number;
    level: number;
};

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

export const SquareBadge = forwardRef<HTMLDivElement, SquareBadgeProps>(
    ({ gradientColor, index, gradientColors, gradientOrientation }, ref) => {
        const { copy, status } = useCopy();
        const [top, setTop] = useState<number>(0);
        const [left, setLeft] = useState<string>(`${0}%`);
        const isCopied = status === 'success';

        const gradientColorLevel = gradientColors as GradientColorLevel[];

        const setLevel = () => {
            if (ref instanceof Function || ref === null || !ref.current) {
                return;
            }
            for (let i = 0; i < gradientColorLevel.length; i++) {
                gradientColorLevel[i].level = getTopLevel(gradientColorLevel, i, ref.current.clientWidth, 0);
            }
        };

        useEffect(() => {
            setLevel();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            setLevel();
            setLeft(getLeft());
            setTop(getTop(gradientColorLevel[index].level));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [index, gradientColorLevel, ref]);

        const getLeft = () => {
            if (gradientOrientation === 90) {
                if (index === 0) {
                    return `${0}%`;
                }
                return `${gradientColor.position}%`;
            } else {
                return `${0}%`;
            }
        };

        const getTop = (level: number) => {
            if (gradientOrientation === 90) {
                return level * 28;
            } else {
                return 28 * index;
            }
        };

        return (
            <div
                className="tw-absolute tw-mt-2"
                style={{
                    left,
                    top,
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
                    <span className="tw-text-x-weak tw-text-xs tw-pr-[5px]">{toHexString(gradientColor.color)}</span>
                    <button
                        data-test-id="gradient-css-copy-button"
                        className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                        onClick={() => copy(toHexString(gradientColor.color))}
                    >
                        {isCopied ? <IconCheckMark16 /> : <IconClipboard16 />}
                    </button>
                </div>
            </div>
        );
    }
);

SquareBadge.displayName = 'SquareBadges';
