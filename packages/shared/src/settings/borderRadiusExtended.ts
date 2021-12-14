/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnitToArray, numericalOrPixelRule } from '..';
import { Radius } from './defaultValues';

/**
 * Returns border radius settings: border radius switch, radius slider, custom radius inputs for every corner
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.dependencyId Id of setting which the border radius is dependend on
 * @returns {ApiBlock} Returns border settings
 */

type BorderRadiusSettingsType = {
    id?: string;
    dependencyId?: string;
};

export const getBorderRadiusExtendedSettings = (options?: BorderRadiusSettingsType): ApiBlock => {
    const HAS_ID = options?.id ? `hasRadius_${options?.id}` : 'hasRadius';
    const VALUE_ID = options?.id ? `radiusValue_${options?.id}` : 'radiusValue';
    const CHOICE_ID = options?.id ? `radiusChoice_${options?.id}` : 'radiusChoice';
    const TOP_LEFT_ID = options?.id ? `radiusTopLeft_${options?.id}` : 'radiusTopLeft';
    const TOP_RIGHT_ID = options?.id ? `radiusTopRight_${options?.id}` : 'radiusTopRight';
    const BOTTOM_LEFT_ID = options?.id ? `radiusBottomLeft_${options?.id}` : 'radiusBottomLeft';
    const BOTTOM_RIGHT_ID = options?.id ? `radiusBottomRight_${options?.id}` : 'radiusBottomRight';

    return {
        id: HAS_ID,
        label: 'Corner radius',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
        show: (bundle: ApiBundle): boolean =>
            options?.dependencyId ? !!bundle.getBlock(options?.dependencyId)?.value : true,
        on: [
            {
                id: VALUE_ID,
                type: 'multiInput',
                layout: MultiInputLayout.Columns,
                onChange: (bundle: ApiBundle): void => appendUnitToArray(bundle, VALUE_ID),
                blocks: [
                    {
                        id: TOP_LEFT_ID,
                        type: 'input',
                        label: 'Top Left',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: TOP_RIGHT_ID,
                        type: 'input',
                        label: 'Top Right',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: BOTTOM_LEFT_ID,
                        type: 'input',
                        label: 'Bottom Left',
                        rules: [numericalOrPixelRule],
                    },
                    {
                        id: BOTTOM_RIGHT_ID,
                        type: 'input',
                        label: 'Bottom Right',
                        rules: [numericalOrPixelRule],
                    },
                ],
            },
        ],
        off: [
            {
                id: CHOICE_ID,
                type: 'slider',
                defaultValue: Radius.None,
                choices: [
                    {
                        value: Radius.None,
                        label: 'None',
                    },
                    {
                        value: Radius.Small,
                        label: 'S',
                    },
                    {
                        value: Radius.Medium,
                        label: 'M',
                    },
                    {
                        value: Radius.Large,
                        label: 'L',
                    },
                ],
            },
        ],
    };
};
