/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SquareBadgesRowProps } from '../types';
import { useEffect, useState } from 'react';
import { HEIGHT_OF_SQUARE_BADGE } from '../constants';
import { SquareBadge } from './SquareBadge';
import { toHexString } from '@frontify/guideline-blocks-shared';
import { getTopLevel, isBadgeLeft } from '../helpers';

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
                    index={index}
                    gradientOrientation={gradientOrientation}
                    blockWidth={blockWidth}
                />
            ))}
        </div>
    );
};
