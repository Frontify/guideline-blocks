/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RgbaObject } from './types';

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param {Object} Object of RGBA values
 * @returns {Boolean} Return if the color is dark
 */
export const isDark = (rgbaObject: RgbaObject): boolean =>
    (rgbaObject.r * 299 + rgbaObject.g * 587 + rgbaObject.b * 114) / 1000 <= 128;
