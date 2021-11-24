/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

/**
 * Checks if value is a numeric value without unit and creates string from value with unit
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} settingId Setting id
 * @param {string} [unit='px'] Unit
 * @returns {string} Set block value to string with unit
 */

export const unitAutocomplete = (bundle: ApiBundle, settingId: string, unit: string = 'px'): void => {
    const value = Number(bundle.getBlock(settingId)?.value);
    if (!Number.isNaN(value)) {
        bundle.setBlockValue(settingId, `${value}${unit}`);
    }
};
