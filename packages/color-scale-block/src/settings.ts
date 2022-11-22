/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { numericalOrPixelRule } from '@frontify/guideline-blocks-shared';

export const settings: BlockSettings = {
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
                    onChange: (bundle) => {
                        const height = Number(bundle.getBlock('heightInput')?.value);
                        if (!isNaN(height)) {
                            bundle.setBlockValue('heightInput', `${height}px`);
                        }
                    },
                },
            ],
        },
    ],
};
