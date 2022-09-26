/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import { appendUnit } from '../helpers/settings/appendUnit';
import { numericalOrPixelRule } from '../utilities/rules/numericalOrPixelRule';
import { presetCustomValue } from '../helpers/settings/presetCustomValue';
import { maximumNumericalOrPixelOrAutoRule } from '../utilities/rules/maximumNumericalOrPixelOrAutoRule';
import { MARGIN_DEFAULT_PLACEHOLDER } from './defaultValues';
import { marginStyleMap, Margin } from './types';

type MarginSettingsType = {
    id?: string;
    marginStyleMap?: Record<Margin, string>;
};

/**
 * Returns margin settings: margin switch, margin slider, custom margin input
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {SettingBlock} Returns margin settings
 */
export const getMarginSlider = (id: string): SettingBlock => ({
    id,
    type: 'slider',
    defaultValue: Margin.Small,
    choices: [
        {
            value: Margin.None,
            label: 'None',
        },
        {
            value: Margin.Small,
            label: 'S',
        },
        {
            value: Margin.Medium,
            label: 'M',
        },
        {
            value: Margin.Large,
            label: 'L',
        },
    ],
});

export const getMarginSettings = (options?: MarginSettingsType): SettingBlock => {
    const hasId = options?.id ? `hasCustomMarginValue_${options?.id}` : 'hasCustomMarginValue';
    const valueId = options?.id ? `marginValue_${options?.id}` : 'marginValue';
    const choiceId = options?.id ? `marginChoice_${options?.id}` : 'marginChoice';

    return {
        id: hasId,
        label: 'Margin',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        info: 'The spacing around UI elements to create more space',
        onChange: (bundle: Bundle): void =>
            presetCustomValue(bundle, choiceId, valueId, options?.marginStyleMap || marginStyleMap),
        on: [
            {
                id: valueId,
                type: 'input',
                placeholder: MARGIN_DEFAULT_PLACEHOLDER,
                rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                onChange: (bundle: Bundle): void => appendUnit(bundle, valueId),
            },
        ],
        off: [getMarginSlider(choiceId)],
    };
};
