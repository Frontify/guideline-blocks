/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { paddingBasicStyleMap } from '.';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomValue } from '..';
import { PADDING_DEFAULT_PLACEHOLDER } from './defaultValues';
import { PaddingBasic } from './types';

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

export const getPaddingSlider = (id: string): ApiBlock => ({
    id: id,
    type: 'slider',
    defaultValue: PaddingBasic.Small,
    choices: [
        {
            value: PaddingBasic.None,
            label: 'None',
        },
        {
            value: PaddingBasic.Small,
            label: 'S',
        },
        {
            value: PaddingBasic.Medium,
            label: 'M',
        },
        {
            value: PaddingBasic.Large,
            label: 'L',
        },
    ],
});

export const getPaddingSettings = (options?: PaddingSettingsType): ApiBlock => {
    const hasId = options?.id ? `hasCustomPadding_${options?.id}` : 'hasCustomPadding';
    const valueId = options?.id ? `paddingValue_${options?.id}` : 'paddingValue';
    const basicId = options?.id ? `paddingBasic_${options?.id}` : 'paddingBasic';

    return {
        id: hasId,
        label: 'Padding',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        onChange: (bundle: ApiBundle): void => presetCustomValue(bundle, basicId, valueId, paddingBasicStyleMap),
        on: [
            {
                id: valueId,
                type: 'input',
                placeholder: PADDING_DEFAULT_PLACEHOLDER,
                rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                onChange: (bundle: ApiBundle): void => appendUnit(bundle, valueId),
            },
        ],
        off: [getPaddingSlider(basicId)],
    };
};
