/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RgbaObject } from './types';

/**
 * Maps object of rgba values to string.
 *
 * @param {Object} Object of RGBA values
 * @returns {String} To be used as css value.
 */
export const mapRgbaToString = (rgbaObject: RgbaObject): string => `rgba(${Object.values(rgbaObject).join(', ')})`;
