/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';
import { SettingBlock } from '@frontify/guideline-blocks-settings';
import { Radius } from './types';
import { appendUnit, numericalOrPixelRule } from '..';

/**
 * Returns border radius settings: border radius switch, radius slider, custom radius input
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.dependentSettingId Id of setting which the border radius is dependent on
 * @returns {SettingBlock} Returns border settings
 */

type BorderRadiusSettingsType = {
    id?: string;
    dependentSettingId?: string;
};

export const getBorderRadiusSlider = (id: string): SettingBlock => ({
    id: id,
    type: 'slider',
    defaultValue: Radius.None,
    choices: [
        {
            value: Radius.None,
            label: 'None',
        },
        {
            value: Radius.Small,
            label: 'S',
        },
        {
            value: Radius.Medium,
            label: 'M',
        },
        {
            value: Radius.Large,
            label: 'L',
        },
    ],
});

export const getBorderRadiusSettings = (options?: BorderRadiusSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasRadius_${options.id}` : 'hasRadius';
    const valueId = options?.id ? `radiusValue_${options.id}` : 'radiusValue';
    const choiceId = options?.id ? `radiusChoice_${options.id}` : 'radiusChoice';

    return {
        id: hasId,
        label: 'Corner radius',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        show: (bundle: Bundle): boolean =>
            options?.dependentSettingId ? !!bundle.getBlock(options.dependentSettingId)?.value : true,
        on: [
            {
                id: valueId,
                type: 'input',
                rules: [numericalOrPixelRule],
                onChange: (bundle: Bundle): void => appendUnit(bundle, valueId),
            },
        ],
        off: [getBorderRadiusSlider(choiceId)],
    };
};
