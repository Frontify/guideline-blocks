/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, numericalOrPixelRule } from '..';

export const getRadiusStyleSettings = (id?: string): ApiBlock[] => {
    const HAS_RADIUS_ID = id ? `hasRadius_${id}` : 'hasRadius';
    const RADIUS_VALUE_ID = id ? `radiusValue_${id}` : 'radiusValue';
    const RADIUS_CHOICE_ID = id ? `radiusChoice_${id}` : 'radiusChoice';

    return [
        {
            id: HAS_RADIUS_ID,
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: RADIUS_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => appendUnit(bundle, RADIUS_VALUE_ID),
                },
            ],
            off: [
                {
                    id: RADIUS_CHOICE_ID,
                    type: 'slider',
                    defaultValue: 'None',
                    choices: [
                        {
                            value: 'None',
                            label: 'None',
                        },
                        {
                            value: 'Small',
                            label: 'S',
                        },
                        {
                            value: 'Medium',
                            label: 'M',
                        },
                        {
                            value: 'Large',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ];
};
