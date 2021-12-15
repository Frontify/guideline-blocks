/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnitToArray, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule } from '..';
import { getPaddingSlider } from './padding';

/**
 * Returns padding settings: padding switch, padding slider, custom padding input for every direction
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @returns {ApiBlock} Returns border settings
 */

type PaddingSettingsType = {
    id?: string;
};

export const getPaddingExtendedSettings = (options?: PaddingSettingsType): ApiBlock => {
    const HAS_ID = options?.id ? `hasCustomPadding_${options?.id}` : 'hasCustomPadding';
    const VALUE_ID = options?.id ? `paddingValues_${options?.id}` : 'paddingValues';
    const CHOICE_ID = options?.id ? `paddingChoice_${options?.id}` : 'paddingChoice';
    const TOP_ID = options?.id ? `paddingTop_${options?.id}` : 'paddingTop';
    const LEFT_ID = options?.id ? `paddingLeft_${options?.id}` : 'paddingLeft';
    const RIGHT_ID = options?.id ? `paddingRight_${options?.id}` : 'paddingRight';
    const BOTTOM_ID = options?.id ? `paddingBottom_${options?.id}` : 'paddingBottom';

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
        off: [getPaddingSlider(CHOICE_ID)],
    };
};
