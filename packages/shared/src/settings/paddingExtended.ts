/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnitToArray, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule } from '..';
import { Padding } from './defaultValues';

export const getPaddingExtendedSettings = (id?: string): ApiBlock => {
    const HAS_ID = id ? `hasCustomPadding_${id}` : 'hasCustomPadding';
    const VALUE_ID = id ? `paddingValues_${id}` : 'paddingValues';
    const CHOICE_ID = id ? `paddingChoice_${id}` : 'paddingChoice';
    const TOP_ID = id ? `paddingTop_${id}` : 'paddingTop';
    const LEFT_ID = id ? `paddingLeft_${id}` : 'paddingLeft';
    const RIGHT_ID = id ? `paddingRight_${id}` : 'paddingRight';
    const BOTTOM_ID = id ? `paddingBottom_${id}` : 'paddingBottom';

    return {
        id: HAS_ID,
        label: 'Padding',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        on: [
            {
                id: VALUE_ID,
                type: 'multiInput',
                layout: MultiInputLayout.Spider,
                onChange: (bundle: ApiBundle): void => appendUnitToArray(bundle, VALUE_ID),
                blocks: [
                    {
                        id: TOP_ID,
                        type: 'input',
                        label: 'Top',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: LEFT_ID,
                        type: 'input',
                        label: 'Left',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: RIGHT_ID,
                        type: 'input',
                        label: 'Right',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: BOTTOM_ID,
                        type: 'input',
                        label: 'Bottom',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                ],
            },
        ],
        off: [
            {
                id: CHOICE_ID,
                type: 'slider',
                defaultValue: Padding.Medium,
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
