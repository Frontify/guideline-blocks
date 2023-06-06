/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import tinycolor, { ColorInput } from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Returns darkened text color for a given background color, so that it is readable and has enough contrast (above 4.5)
 *
 * @param {Object} textColor Object of RGBA values
 * @param {Object} backgroundColor Object of RGBA values
 * @returns {string} To be used as css value
 */

const isRgbaLongFormat = (value: unknown): value is Color => {
    const requiredKeys = ['red', 'green', 'blue'];
    return typeof value === 'object' && requiredKeys.every((i) => value?.hasOwnProperty(i));
};

export const getReadableColor = (textColor: unknown, backgroundColor: unknown): string => {
    const inputTextColor = isRgbaLongFormat(textColor) ? toShortRgba(textColor) : (textColor as ColorInput);
    const inputBackgroundColor = isRgbaLongFormat(backgroundColor)
        ? toShortRgba(backgroundColor)
        : (backgroundColor as ColorInput);
    const parsedTextColor = tinycolor(inputTextColor);
    const parsedBackgroundColor = tinycolor(inputBackgroundColor);

    // darken the text color until readability is good
    while (tinycolor.readability(parsedTextColor, parsedBackgroundColor) < 4.5) {
        parsedTextColor.darken(2);
    }

    return parsedTextColor.toRgbString();
};
