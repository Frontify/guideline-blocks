/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockSettings } from '@frontify/guideline-blocks-settings';


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
                    rules: [
                        {
                            errorMessage: "Please use a numerical value with or without 'px'",
                            validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
                        },
                    ],
                },
            ],
        },
    ],
};
