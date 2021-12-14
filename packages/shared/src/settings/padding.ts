/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomValue } from '..';
import { Padding, paddingValues } from './defaultValues';

/**
 * Returns padding settings: padding switch, padding slider, custom padding input
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {ApiBlock} Returns border settings
 */

type PaddingSettingsType = {
    id?: string;
};

export const PaddingSlider = (id: string): ApiBlock => ({
    id: id,
    type: 'slider',
    defaultValue: Padding.Small,
    choices: [
        {
            value: Padding.None,
            label: 'None',
        },
        {
            value: Padding.Small,
            label: 'S',
        },
        {
            value: Padding.Medium,
            label: 'M',
        },
        {
            value: Padding.Large,
            label: 'L',
        },
    ],
});

export const getPaddingSettings = (options?: PaddingSettingsType): ApiBlock => {
    const HAS_ID = options?.id ? `hasCustomPadding_${options?.id}` : 'hasCustomPadding';
    const VALUE_ID = options?.id ? `paddingValue_${options?.id}` : 'paddingValue';
    const CHOICE_ID = options?.id ? `paddingChoice_${options?.id}` : 'paddingChoice';

    return {
        id: HAS_ID,
        label: 'Padding',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        onChange: (bundle: ApiBundle): void => presetCustomValue(bundle, CHOICE_ID, VALUE_ID, paddingValues),
        on: [
            {
                id: VALUE_ID,
                type: 'input',
                placeholder: '24px',
                rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                onChange: (bundle: ApiBundle): void => appendUnit(bundle, VALUE_ID),
            },
        ],
        off: [PaddingSlider(CHOICE_ID)],
    };
};
