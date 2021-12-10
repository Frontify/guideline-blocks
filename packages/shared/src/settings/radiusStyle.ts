/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, numericalOrPixelRule } from '..';

export const getRadiusStyleSettings = (id: string): ApiBlock[] => {
    const HAS_RADIUS_ID = `hasRadius_${id}`;
    const RADIUS_VALUE_ID = `radiusValue_${id}`;

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
                    id: 'borderRadiusChoice',
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
