/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { prepareGradientColors, toHex6or8String } from '../helpers';
import { type SquareBadgesRowProps } from '../types';

import { SquareBadge } from './';

export const SquareBadgesRow = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesRowProps) => {
    const preparedColors = useMemo(
        () => prepareGradientColors(gradientColors, blockWidth),
        [gradientColors, blockWidth]
    );

    const highestLevel = preparedColors.reduce((highest, { level }) => Math.max(highest, level ?? 0), 0) + 1;

    const height =
        gradientOrientation === 90
            ? HEIGHT_OF_SQUARE_BADGE * highestLevel + 1
            : HEIGHT_OF_SQUARE_BADGE * preparedColors.length;

    const colors = gradientOrientation === 0 ? [...preparedColors].reverse() : preparedColors;

    return (
        <div
            className="tw-relative tw-w-full"
            style={{
                minHeight: HEIGHT_OF_SQUARE_BADGE,
                height,
            }}
        >
            {colors.map((gradientColor, index) => (
                <SquareBadge
                    key={toHex6or8String(gradientColor.color) + gradientColor.position}
                    gradientColor={gradientColor}
                    index={index}
                    gradientOrientation={gradientOrientation}
                    blockWidth={blockWidth}
                    isLast={index === colors.length - 1}
                />
            ))}
        </div>
    );
};
