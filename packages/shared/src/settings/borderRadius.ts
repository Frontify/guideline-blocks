/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, numericalOrPixelRule } from '..';
import { Radius } from './defaultValues';

/**
 * Returns border radius settings: border radius switch, radius slider, custom radius input
 *
 * @param options Options for the settings
 * @param options.id Custom suffix for the setting ids
 * @param options.dependencyId Id of setting which the border radius is dependend on
 * @returns {ApiBlock} Returns border settings
 */

export const getBorderRadiusSettings = (options?: { id?: string; dependencyId?: string }): ApiBlock => {
    const HAS_ID = options?.id ? `hasRadius_${options?.id}` : 'hasRadius';
    const VALUE_ID = options?.id ? `radiusValue_${options?.id}` : 'radiusValue';
    const CHOICE_ID = options?.id ? `radiusChoice_${options?.id}` : 'radiusChoice';

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
                type: 'input',
                rules: [numericalOrPixelRule],
                onChange: (bundle: ApiBundle): void => appendUnit(bundle, VALUE_ID),
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
