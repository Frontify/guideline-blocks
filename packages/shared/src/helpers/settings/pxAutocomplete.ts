/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

/**
 * Checks if value is a numeric value without "px" and creates string from value with "px"
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} settingId Setting id
 * @returns {string} Set block value to string with "px"
 */

export const pxAutocomplete = (bundle: ApiBundle, settingId: string): void => {
    const value = Number(bundle.getBlock(settingId)?.value);
    if (!Number.isNaN(value)) {
        bundle.setBlockValue(settingId, `${value}px`);
    }
};
