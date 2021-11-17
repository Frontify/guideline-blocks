/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Checks if value is a numeric value without "px" and creates string from value with "px"
 *
 * @param Block bundle
 * @param {string} Block Id
 * @returns Set block value to string with "px"
 */

export const pxAutocomplete = (bundle: any, blockId: string) => {
    const value = Number(bundle.getBlock(blockId)?.value);
    if (!Number.isNaN(value)) {
        bundle.setBlockValue(blockId, `${value}px`);
    }
};
