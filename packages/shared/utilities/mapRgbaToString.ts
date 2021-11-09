/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Maps object of rgba values to string
 *
 * @param rgbaObject Object of rgba values
 * @returns Clean string to be used in as css value
 */
export const mapRgbaToString = (rgbaObject: { r: number; g: number; b: number; a: number }): string =>
    `rgba(${Object.values(rgbaObject).join(', ')})`;
