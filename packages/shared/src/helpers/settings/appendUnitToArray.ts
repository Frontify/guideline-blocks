/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { Unit } from './types';

/**
 * Checks if value is an array and appends unit to numeric values in array without a unit. Non-numeric values or numeric
 * values with unit are left unchanged.
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} settingId Setting id
 * @param {('px'|'em'|'rem'|'%')} [unit='px'] Unit
 * @returns {void} Set block value to string with unit or unchanged
 */

export const appendUnitToArray = (bundle: ApiBundle, settingId: string, unit: Unit = 'px'): void => {
    const blockValue = bundle.getBlock(settingId)?.value;
    if (Array.isArray(blockValue)) {
        const newValue = blockValue.map((singleValue) => {
            if (!Number.isNaN(Number(singleValue)) && singleValue !== '') {
                return `${singleValue}${unit}`;
            } else {
                return singleValue;
            }
        });
        bundle.setBlockValue(settingId, newValue);
    }
};
