/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';

type Unit = 'px' | 'em' | 'rem' | '%';

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
    console.log('appendUnitToArray');
    if (Array.isArray(blockValue)) {
        const newValue = blockValue.map((singleValue: ApiBlock['value']): ApiBlock['value'] => {
            if (!Number.isNaN(Number(singleValue)) && singleValue !== '') {
                return `${singleValue}${unit}`;
            } else {
                return singleValue;
            }
        }) as ApiBlock['value'];
        bundle.setBlockValue(settingId, newValue);
    }
};
