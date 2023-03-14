/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GradientColor } from '../types';
import { toHexString } from '@frontify/guideline-blocks-shared';

export const parseGradientColorsToCss = (gradientColors: GradientColor[] | undefined, gradientOrientation: number) => {
    if (!gradientColors) {
        return '';
    } else {
        let colorsAsString = '';
        for (const color of gradientColors.sort((a, b) => a.position - b.position)) {
            colorsAsString += `, ${toHexString(color.color)} ${color.position}%`;
        }

        return `linear-gradient(${gradientOrientation}deg${colorsAsString})`;
    }
};
