/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from 'tinycolor2';
import { toShortRgba } from './toShortRgba';

/**
 * Returns darkened text color for a given background color, so that it is readable and has enough contrast (above 4.5)
 *
 * @param {Object} textColor Object of RGBA values
 * @param {Object} backgroundColor Object of RGBA values
 * @returns {string} To be used as css value
 */

export const getReadableColor = (textColor: unknown, backgroundColor: unknown): string => {
    const inputTextColor = toShortRgba(textColor);
    const inputBackgroundColor = toShortRgba(backgroundColor);
    const parsedTextColor = tinycolor(inputTextColor);
    const parsedBackgroundColor = tinycolor(inputBackgroundColor);

    // darken the text color until readability is good
    while (tinycolor.readability(parsedTextColor, parsedBackgroundColor) < 4.5) {
        parsedTextColor.darken(2);
    }

    return parsedTextColor.toRgbString();
};
