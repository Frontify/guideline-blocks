/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import tinycolor from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Maps color object of rgba values to hex alpha string.
 *
 * @param {Object} Color object
 * @returns {String} To be used as css value.
 */

export const toHex8String = (color: Color): string => tinycolor(toShortRgba(color)).toHex8String();
