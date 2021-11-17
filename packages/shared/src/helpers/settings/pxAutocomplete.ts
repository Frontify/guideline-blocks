//TODO: Remove when PR with sidebar types is merged
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Checks if value is a numeric value without "px" and creates string from value with "px"
 *
 * @param {Object} bundle Sidebar bundle object
 * @param {number} settingId Setting id
 * @returns {string} Set block value to string with "px"
 */

export const pxAutocomplete = (bundle: any, settingId: string): void => {
    const value = Number(bundle.getBlock(settingId)?.value);
    if (!Number.isNaN(value)) {
        bundle.setBlockValue(settingId, `${value}px`);
    }
};
