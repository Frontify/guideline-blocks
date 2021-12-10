/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomValue } from '..';
import { Padding, paddingValues } from './defaultValues';

export const getPaddingSettings = (id?: string): ApiBlock => {
    const HAS_ID = id ? `hasCustomPadding_${id}` : 'hasCustomPadding';
    const VALUE_ID = id ? `paddingValue_${id}` : 'paddingValue';
    const CHOICE_ID = id ? `paddingChoice_${id}` : 'paddingChoice';

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
        off: [
            {
                id: CHOICE_ID,
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
            },
        ],
    };
};
