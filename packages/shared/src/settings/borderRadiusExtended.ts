/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnitToArray, numericalOrPixelRule } from '..';
import { Radius } from './defaultValues';

export const getBorderRadiusSettings = (id?: string): ApiBlock => {
    const HAS_ID = id ? `hasRadius_${id}` : 'hasRadius';
    const VALUE_ID = id ? `radiusValue_${id}` : 'radiusValue';
    const CHOICE_ID = id ? `radiusChoice_${id}` : 'radiusChoice';
    const TOP_LEFT_ID = id ? `radiusTopLeft_${id}` : 'radiusTopLeft';
    const TOP_RIGHT_ID = id ? `radiusTopRight_${id}` : 'radiusTopRight';
    const BOTTOM_LEFT_ID = id ? `radiusBottomLeft_${id}` : 'radiusBottomLeft';
    const BOTTOM_RIGHT_ID = id ? `radiusBottomRight_${id}` : 'radiusBottomRight';

    return {
        id: HAS_ID,
        label: 'Corner radius',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
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
