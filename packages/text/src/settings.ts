/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DEFAULT_COLUMN_GUTTER, DEFAULT_COLUMN_NUMBER } from './constant';
import { numericalPixelValueRule, betweenPixelValue } from './rules';

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

export default {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'text',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'text',
                    icon: 'align-left',
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'columnNumber',
            type: 'slider',
            defaultValue: DEFAULT_COLUMN_NUMBER,
            choices: columnNumberChoices,
        },
        {
            id: 'isColumnGutterCustom',
            label: 'Gutter',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: 'columnGutterCustom',
                    type: 'input',
                    defaultValue: DEFAULT_COLUMN_GUTTER,
                    rules: [numericalPixelValueRule, betweenPixelValue(0, 200)],
                    onChange: (bundle: any): void => {
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
};
