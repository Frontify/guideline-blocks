/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import tinycolor from 'tinycolor2';

interface TinyColorInstance {
    _r: number;
    _g: number;
    _b: number;
    _a: number;
}

/**
 * Maps color strings to color objects.
 *
 * @param {String} String representing color
 * @returns {Color} Color object
 */

export const toColorObject = (colorString: string): Color => {
    const { _r, _g, _b, _a } = tinycolor(colorString) as unknown as TinyColorInstance;
    return { red: _r, green: _g, blue: _b, alpha: _a };
};
