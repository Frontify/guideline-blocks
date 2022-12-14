/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DropdownSize,
    IconEnum,
    betweenPixelRule,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

export const PLACEHOLDER = 'Your text here';
export const DEFAULT_COLUMN_NUMBER = 1;
export const DEFAULT_COLUMN_GUTTER = '24px';

export const columnGutterChoices = [
    {
        value: DEFAULT_COLUMN_GUTTER,
        label: 'S',
    },
    {
        value: '36px',
        label: 'M',
    },
    {
        value: '60px',
        label: 'L',
    },
];

export const columnNumberChoices = [
    {
        value: DEFAULT_COLUMN_NUMBER,
        label: `${DEFAULT_COLUMN_NUMBER}`,
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
];

export const settings = defineSettings({
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'text',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'text',
                    icon: IconEnum.TextAlignmentLeft,
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'columnNumber',
            type: 'slider',
            label: 'Columns',
            defaultValue: DEFAULT_COLUMN_NUMBER,
            choices: columnNumberChoices,
        },
        {
            id: 'isColumnGutterCustom',
            label: 'Gutter',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: "An official nerd's term for 'column gap'",
            show: (bundle) => Number(bundle.getBlock('columnNumber')?.value) > 1,
            on: [
                {
                    id: 'columnGutterCustom',
                    type: 'input',
                    defaultValue: DEFAULT_COLUMN_GUTTER,
                    rules: [numericalOrPixelRule, betweenPixelRule(0, 200)],
                    onChange: (bundle) => {
                        const gutter = Number(bundle.getBlock('columnGutterCustom')?.value);
                        if (!isNaN(gutter)) {
                            bundle.setBlockValue('columnGutterCustom', `${gutter}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'columnGutterSimple',
                    type: 'slider',
                    defaultValue: DEFAULT_COLUMN_GUTTER,
                    choices: columnGutterChoices,
                },
            ],
        },
    ],
});
