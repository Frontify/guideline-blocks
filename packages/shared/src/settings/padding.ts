/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomValue } from '..';
import { PADDING_DEFAULT_PLACEHOLDER } from './defaultValues';
import { Padding, paddingStyleMap } from './types';

/**
 * Returns padding settings: padding switch, padding slider, custom padding input
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {SettingBlock} Returns border settings
 */

type PaddingSettingsType = {
    id?: string;
    paddingStyleMap?: Record<Padding, string>;
};

export const getPaddingSlider = (id: string): SettingBlock => ({
    id,
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

export const getPaddingSettings = (options?: PaddingSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasCustomPaddingValue_${options?.id}` : 'hasCustomPaddingValue';
    const valueId = options?.id ? `paddingValue_${options?.id}` : 'paddingValue';
    const choiceId = options?.id ? `paddingChoice_${options?.id}` : 'paddingChoice';

    return {
        id: hasId,
        label: 'Padding',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        info: 'The spacing around UI elements to create more negative space',
        onChange: (bundle: Bundle): void =>
            presetCustomValue(bundle, choiceId, valueId, options?.paddingStyleMap || paddingStyleMap),
        on: [
            {
                id: valueId,
                type: 'input',
                placeholder: PADDING_DEFAULT_PLACEHOLDER,
                rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                onChange: (bundle: Bundle): void => appendUnit(bundle, valueId),
            },
        ],
        off: [getPaddingSlider(choiceId)],
    };
};
