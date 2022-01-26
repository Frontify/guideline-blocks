/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/arcade';
import tinycolor from 'tinycolor2';

/**
 * Maps color object of rgba values to hex alpha string.
 *
 * @param {Object} Color object
 * @returns {String} To be used as css value.
 */

export const toHex8String = (color: Color): string => tinycolor(color).toHex8String();
