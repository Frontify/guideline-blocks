/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param {Object} value Object of RGBA values
 * @returns {Boolean} Return if the color is dark
 */

export const isDark = (color: unknown): boolean => {
    const inputColor = toShortRgba(color);
    const parsedColor = tinycolor(inputColor);
    return parsedColor.isDark() || (parsedColor.getAlpha() > 0.25 && parsedColor.getAlpha() < 1);
};
