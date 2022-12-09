/* (c) Copyright Frontify Ltd., all rights reserved. */

import { appendUnit, defineSettings, numericalOrPixelRule } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    layout: [
        {
            id: 'customHeight',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            off: [
                {
                    id: 'heightSlider',
                    type: 'slider',
                    defaultValue: '96px',
                    choices: [
                        {
                            value: '48px',
                            label: 'S',
                        },
                        {
                            value: '72px',
                            label: 'M',
                        },
                        {
                            value: '96px',
                            label: 'L',
                        },
                    ],
                },
            ],
            on: [
                {
                    id: 'heightInput',
                    type: 'input',
                    defaultValue: '100px',
                    clearable: false,
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'heightInput'),
                },
            ],
        },
    ],
});
