/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

/**
 * Checks if value is a numeric value without unit and creates string from value with unit
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} settingId Setting id
 * @param {('px'|'em'|'rem'|'%')} [unit='px'] Unit
 * @returns {string} Set block value to string with unit
 */

export const appendUnit = (bundle: ApiBundle, settingId: string, unit: 'px' | 'em' | 'rem' | '%' = 'px'): void => {
    const value = Number(bundle.getBlock(settingId)?.value);
    if (!Number.isNaN(value)) {
        bundle.setBlockValue(settingId, `${value}${unit}`);
    }
};
