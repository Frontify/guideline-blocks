/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/fondue';
import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import { appendUnit } from '../helpers/settings/appendUnit';
import { presetCustomValue } from '../helpers/settings/presetCustomValue';
import { maximumNumericalOrPixelOrAutoRule } from '../utilities/rules/maximumNumericalOrPixelOrAutoRule';
import { numericalOrPixelRule } from '../utilities/rules/numericalOrPixelRule';
import { PADDING_DEFAULT_PLACEHOLDER } from './defaultValues';
import { getPaddingSlider } from './padding';
import { paddingStyleMap } from './types';

type PaddingSettingsType = {
    id?: string;
};

/**
 * Returns padding settings: padding switch, padding slider, custom padding input for every direction
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {SettingBlock} Returns padding settings
 */
export const getPaddingExtendedSettings = (options?: PaddingSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasExtendedCustomPadding_${options?.id}` : 'hasExtendedCustomPadding';
    const valueId = options?.id ? `extendedPaddingValues_${options?.id}` : 'extendedPaddingValues';
    const choiceId = options?.id ? `extendedPaddingChoice_${options?.id}` : 'extendedPaddingChoice';
    const topId = options?.id ? `extendedPaddingTop_${options?.id}` : 'extendedPaddingTop';
    const leftId = options?.id ? `extendedPaddingLeft_${options?.id}` : 'extendedPaddingLeft';
    const rightId = options?.id ? `extendedPaddingRight_${options?.id}` : 'extendedPaddingRight';
    const bottomId = options?.id ? `extendedPaddingBottom_${options?.id}` : 'extendedPaddingBottom';

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
                        onChange: (bundle) => {
                            if (bundle.getBlock(topId)?.value === '') {
                                bundle.setBlockValue(topId, '0px');
                            } else {
                                appendUnit(bundle, topId);
                            }
                        },
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: leftId,
                        type: 'input',
                        label: 'Left',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle) => {
                            if (bundle.getBlock(leftId)?.value === '') {
                                bundle.setBlockValue(leftId, '0px');
                            } else {
                                appendUnit(bundle, leftId);
                            }
                        },
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: rightId,
                        type: 'input',
                        label: 'Right',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle) => {
                            if (bundle.getBlock(rightId)?.value === '') {
                                bundle.setBlockValue(rightId, '0px');
                            } else {
                                appendUnit(bundle, rightId);
                            }
                        },
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: bottomId,
                        type: 'input',
                        label: 'Bottom',
                        placeholder: PADDING_DEFAULT_PLACEHOLDER,
                        onChange: (bundle) => {
                            if (bundle.getBlock(bottomId)?.value === '') {
                                bundle.setBlockValue(bottomId, '0px');
                            } else {
                                appendUnit(bundle, bottomId);
                            }
                        },
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                ],
            },
        ],
        off: [getPaddingSlider(choiceId)],
    };
};
