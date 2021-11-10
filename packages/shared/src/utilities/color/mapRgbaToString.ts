/* (c) Copyright Frontify Ltd., all rights reserved. */

type RgbaObject = {
    r: number;
    g: number;
    b: number;
    a: number;
};

/**
 * Maps object of rgba values to string.
 *
 * @param rgbaObject Object of rgba values
 * @returns String to be used in as css value.
 */
export const mapRgbaToString = (rgbaObject: RgbaObject): string => `rgba(${Object.values(rgbaObject).join(', ')})`;
