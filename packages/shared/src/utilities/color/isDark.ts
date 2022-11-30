/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import tinycolor, { ColorInput } from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param {Object} value Object of RGBA values
 * @returns {Boolean} Return if the color is dark
 */

const isRgbaLongFormat = (value: unknown): value is Color => {
    const requiredKeys = ['red', 'green', 'blue'];
    return typeof value === 'object' && requiredKeys.every((i) => value?.hasOwnProperty(i));
};

export const isDark = (color: unknown): boolean => {
    const inputColor = isRgbaLongFormat(color) ? toShortRgba(color) : (color as ColorInput);
    const parsedColor = tinycolor(inputColor);
    return parsedColor.isDark() || (parsedColor.getAlpha() > 0.25 && parsedColor.getAlpha() < 1);
};
