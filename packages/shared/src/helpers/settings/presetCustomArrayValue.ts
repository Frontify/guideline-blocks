/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';

/**
 * Sets value of custom input array to predefined value from the slider, if no custom value is set already
 *
 * @param {ApiBundle} bundle Sidebar bundle object
 * @param {string} sliderId Setting id of the slider
 * @param {string} inputId Setting id of the input
 * @param {Object} map Map of enum and values
 * @param {number} arrayLength Length of return array
 * @returns Set value of multiInput to predefined value with specified length from the slider
 */

export const presetCustomArrayValue = (
    bundle: ApiBundle,
    sliderId: string,
    inputId: string,
    map: Record<string, string>,
    arrayLength: number
): void => {
    const sliderValue = bundle.getBlock(sliderId)?.value as string;
    const customValue = bundle.getBlock(inputId)?.value as string[];

    const isEqualArray = customValue?.every((value) => value === customValue?.[0]);
    const valueInMap = Object.keys(map).find((key) => map[key] === customValue?.[0]);

    const isPredefinedValue = sliderValue && isEqualArray && valueInMap;

    const hasNoCustomValue = sliderValue && !customValue;

    if (isPredefinedValue || hasNoCustomValue) {
        bundle.setBlockValue(inputId, new Array(arrayLength).fill(map[sliderValue]));
    }
};
