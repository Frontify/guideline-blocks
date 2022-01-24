/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from 'tinycolor2';
import { Color } from '@frontify/arcade';

/**
 * Maps color object of rgba values to hex alpha string.
 *
 * @param {Object} Color object
 * @returns {String} To be used as css value.
 */

export const colorToHexAlpha = (color: Color): string => tinycolor(color).toHex8String();
