/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from 'tinycolor2';
import { Color } from '@frontify/arcade';

/**
 * Maps color object of rgba values to rgba string.
 *
 * @param {Object} Color object
 * @returns {String} To be used as css value.
 */

export const mapRgbaToString = (color: Color): string => tinycolor(color).toRgbString();
