/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import tinycolor from 'tinycolor2';

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param {Object} Object of RGBA values
 * @returns {Boolean} Return if the color is dark
 */
export const isDark = (color: Color): boolean => {
    const parsedColor = tinycolor(color);
    return parsedColor.isDark() || (parsedColor.getAlpha() > 0.25 && parsedColor.getAlpha() < 1);
};
