/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { Unit } from './types';

/**
 * Checks if value is a numeric value without unit and creates string from value with unit
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} settingId Setting id
 * @param {('px'|'em'|'rem'|'%')} [unit='px'] Unit
 * @returns {string} Set block value to string with unit
 */

export const appendUnit = (bundle: ApiBundle, settingId: string, unit: Unit = 'px'): void => {
    const blockValue = bundle.getBlock(settingId)?.value;
    const numericValue = Number(blockValue);
    if (!Number.isNaN(numericValue) && blockValue !== '') {
        bundle.setBlockValue(settingId, `${numericValue}${unit}`);
    }
};
