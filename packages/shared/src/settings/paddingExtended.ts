/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomValue } from '..';
import { PADDING_DEFAULT_PLACEHOLDER } from './defaultValues';
import { getPaddingSlider } from './padding';
import { paddingStyleMap } from './types';

/**
 * Returns padding settings: padding switch, padding slider, custom padding input for every direction
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {SettingBlock} Returns border settings
 */

type PaddingSettingsType = {
    id?: string;
};

export const getPaddingExtendedSettings = (options?: PaddingSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasCustomPadding_${options?.id}` : 'hasCustomPadding';
    const valueId = options?.id ? `paddingValues_${options?.id}` : 'paddingValues';
    const choiceId = options?.id ? `paddingChoice_${options?.id}` : 'paddingChoice';
    const topId = options?.id ? `paddingTop_${options?.id}` : 'paddingTop';
    const leftId = options?.id ? `paddingLeft_${options?.id}` : 'paddingLeft';
    const rightId = options?.id ? `paddingRight_${options?.id}` : 'paddingRight';
    const bottomId = options?.id ? `paddingBottom_${options?.id}` : 'paddingBottom';

    return {
        id: hasId,
        label: 'Padding',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        info: 'The spacing around UI elements to create more negative space',
        onChange: (bundle: Bundle): void => {
            presetCustomValue(bundle, choiceId, topId, paddingStyleMap);
            presetCustomValue(bundle, choiceId, leftId, paddingStyleMap);
            presetCustomValue(bundle, choiceId, rightId, paddingStyleMap);
            presetCustomValue(bundle, choiceId, bottomId, paddingStyleMap);
        },
        on: [
            {
                id: valueId,
                type: 'multiInput',
                layout: MultiInputLayout.Spider,
                blocks: [
                    {
                        id: topId,
                        type: 'input',
                        label: 'Top',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle: Bundle): void => appendUnit(bundle, topId),
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: leftId,
                        type: 'input',
                        label: 'Left',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle: Bundle): void => appendUnit(bundle, leftId),
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: rightId,
                        type: 'input',
                        label: 'Right',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle: Bundle): void => appendUnit(bundle, rightId),
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: bottomId,
                        type: 'input',
                        label: 'Bottom',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle: Bundle): void => appendUnit(bundle, bottomId),
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                ],
            },
        ],
        off: [getPaddingSlider(choiceId)],
    };
};
