import { IconCode, DropdownSize, IconEnum, /*DropdownSize,*/ MultiInputLayout } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';


export const settings: BlockSettings = {
    layout: [
        {
            id: 'heightSwitchId',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            off: [
                {
                    id: 'heightSliderId',
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
                    id: 'heightInputId',
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
