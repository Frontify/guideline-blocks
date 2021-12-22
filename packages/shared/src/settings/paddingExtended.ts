/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { paddingBasicStyleMap } from '.';
import { appendUnitToArray, maximumNumericalOrPixelOrAutoRule, numericalOrPixelRule, presetCustomArrayValue } from '..';
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
    const hasId = options?.id ? `hasCustomPadding_${options?.id}` : 'hasCustomPadding';
    const valueId = options?.id ? `paddingValues_${options?.id}` : 'paddingValues';
    const basicId = options?.id ? `paddingBasic_${options?.id}` : 'paddingBasic';
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
        onChange: (bundle: ApiBundle): void =>
            presetCustomArrayValue(bundle, basicId, valueId, paddingBasicStyleMap, 4),
        on: [
            {
                id: valueId,
                type: 'multiInput',
                layout: MultiInputLayout.Spider,
                onChange: (bundle: ApiBundle): void => appendUnitToArray(bundle, valueId),
                blocks: [
                    {
                        id: topId,
                        type: 'input',
                        label: 'Top',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: leftId,
                        type: 'input',
                        label: 'Left',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: rightId,
                        type: 'input',
                        label: 'Right',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                    {
                        id: bottomId,
                        type: 'input',
                        label: 'Bottom',
                        rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                    },
                ],
            },
        ],
        off: [getPaddingSlider(basicId)],
    };
};
