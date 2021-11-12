/* (c) Copyright Frontify Ltd., all rights reserved. */

type RgbaObject = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

/**
 * Calculates if text should be in a light color depending on color (e.g. background-color)
 *
 * @param rgbaObject Object of rgba values
 * @returns Boolean if text should be light color.
 */
export const shouldUseLightText = (rgbaObject: RgbaObject): boolean => (rgbaObject.r * 299 + rgbaObject.g * 587 + rgbaObject.b * 114) / 1000 <= 128;
