/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DropdownSize,
    IconEnum,
    appendUnit,
    betweenPixelRule,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';
import { TextGutter, spacingValues } from './types';

export const PLACEHOLDER = 'Your text here';
const columnGutterCustomId = 'columnGutterCustom';

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
            defaultValue: '1',
            choices: [
                {
                    value: 1,
                    label: '1',
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
            ],
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
                    id: columnGutterCustomId,
                    type: 'input',
                    defaultValue: spacingValues[TextGutter.Auto],
                    rules: [numericalOrPixelRule, betweenPixelRule(0, 200)],
                    onChange: (bundle) => appendUnit(bundle, columnGutterCustomId),
                },
            ],
            off: [
                {
                    id: 'columnGutterSimple',
                    type: 'slider',
                    defaultValue: TextGutter.S,
                    choices: [
                        {
                            value: TextGutter.Auto,
                            label: TextGutter.Auto,
                        },
                        {
                            value: TextGutter.S,
                            label: TextGutter.S,
                        },
                        {
                            value: TextGutter.M,
                            label: TextGutter.M,
                        },
                        {
                            value: TextGutter.L,
                            label: TextGutter.L,
                        },
                    ],
                },
            ],
        },
    ],
});
