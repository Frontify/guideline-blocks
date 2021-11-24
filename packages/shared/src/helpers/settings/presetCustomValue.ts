/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

/**
 * Checks if value is a numeric value without "px" and creates string from value with "px"
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} sliderId Setting id of the slider
 * @param {string} inputId Setting id of the input
 * @param {Object} map Map of enum and values
 * @returns {string} Set block value to string with "px"
 */

export const presetCustomValue = (
    bundle: ApiBundle,
    sliderId: string,
    inputId: string,
    map: Record<string, string>
): void => {
    const sliderValue = bundle.getBlock(sliderId)?.value as string;
    const customValue = bundle.getBlock(inputId)?.value;
    const dividerHeightKey = Object.keys(map).find((key) => map[key] === customValue);
    if ((sliderValue && dividerHeightKey) || (sliderValue && !customValue)) {
        bundle.setBlockValue(inputId, map[sliderValue]);
    }
};
