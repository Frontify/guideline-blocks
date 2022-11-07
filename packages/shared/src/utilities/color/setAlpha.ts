/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import tinycolor, { ColorInput } from 'tinycolor2';
import { isRgbaLongFormat } from './isRgbaLongFormat';
import { toShortRgba } from './toShortRgba';

/**
 * Sets alpha value and returns rgba string.
 *
 * @param {Unknown} color
 * @returns {String} To be used as css value.
 */

export const setAlpha = (color: unknown, alpha: number): string => {
    const inputColor = isRgbaLongFormat(color as Color) ? toShortRgba(color) : (color as ColorInput);
    return tinycolor(inputColor).setAlpha(alpha).toRgbString();
};
