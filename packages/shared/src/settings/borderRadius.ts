/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { ApiBlock } from '@frontify/guideline-blocks-settings/types/blocks';
import { appendUnit, numericalOrPixelRule } from '..';
import { Radius } from './defaultValues';

export const getBorderRadiusSettings = (id?: string): ApiBlock => {
    const HAS_ID = id ? `hasRadius_${id}` : 'hasRadius';
    const VALUE_ID = id ? `radiusValue_${id}` : 'radiusValue';
    const CHOICE_ID = id ? `radiusChoice_${id}` : 'radiusChoice';

    return {
        id: HAS_ID,
        label: 'Corner radius',
        type: 'switch',
        switchLabel: 'Custom',
        defaultValue: false,
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
