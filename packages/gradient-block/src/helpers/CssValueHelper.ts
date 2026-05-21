/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex6or8String } from './HexStringHelper';
import { type GradientColor } from '../types';

export const parseGradientColorsToCss = (gradientColors: GradientColor[] | undefined, gradientOrientation: number) => {
    if (!gradientColors) {
        return '';
    } else {
        let colorsAsString = '';
        for (const color of gradientColors.sort((a, b) => a.position - b.position)) {
            colorsAsString += `, ${toHex6or8String(color.color)} ${color.position}%`;
        }

        return `linear-gradient(${gradientOrientation}deg${colorsAsString})`;
    }
};
