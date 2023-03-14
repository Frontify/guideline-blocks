/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { calculateLevelOfLast, prepareGradientColors } from '../helpers';
import { SquareBadgesRowProps } from '../types';
import { SquareBadge } from './';
import { toHexString } from '@frontify/guideline-blocks-shared';

export const SquareBadgesRow = ({ blockWidth, gradientColors, gradientOrientation }: SquareBadgesRowProps) => {
    const [highestLevel, setHighestLevel] = useState(0);

    const prepareGradients = () => {
        gradientColors = prepareGradientColors(gradientColors, blockWidth);
        gradientColors[gradientColors.length - 1].level = calculateLevelOfLast(gradientColors);

        const highestLevel =
            (gradientColors.reduce((prev, current) => {
                return (prev.level || 0) > (current.level || 0) ? prev : current;
            }).level || 0) + 1;

        setHighestLevel(highestLevel);
    };

    useEffect(() => {
        prepareGradients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const height =
        gradientOrientation === 90
            ? HEIGHT_OF_SQUARE_BADGE * highestLevel + 1
            : HEIGHT_OF_SQUARE_BADGE * (gradientColors?.length || 0);

    return (
        <div
            className="tw-relative tw-w-full"
            style={{
                height,
            }}
        >
            {gradientColors.map((gradientColor, index) => (
                <SquareBadge
                    key={toHexString(gradientColor.color) + gradientColor.position}
                    gradientColor={gradientColor}
                    index={index}
                    gradientOrientation={gradientOrientation}
                    blockWidth={blockWidth}
                />
            ))}
        </div>
    );
};
