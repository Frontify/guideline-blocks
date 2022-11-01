/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import tinycolor, { ColorInput } from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param {Object} Object of RGBA values
 * @returns {Boolean} Return if the color is dark
 */

const isRgbaLongFormat = (value: Color) => {
    const requiredKeys = ['red', 'green', 'blue'];
    return typeof value === 'object' && requiredKeys.every((i) => value.hasOwnProperty(i));
};

export const isDark = (color: unknown): boolean => {
    const inputColor = isRgbaLongFormat(color as Color) ? toShortRgba(color) : (color as ColorInput);
    const parsedColor = tinycolor(inputColor);
    return parsedColor.isDark() || (parsedColor.getAlpha() > 0.25 && parsedColor.getAlpha() < 1);
};
