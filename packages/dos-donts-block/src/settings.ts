/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DropdownSize,
    IconEnum,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { DoDontLayout, DoDontSpacing, DoDontStyle, spacingValues } from './types';

export const DO_COLOR_DEFAULT_VALUE = { red: 0, green: 200, blue: 165, alpha: 1 };
export const DONT_COLOR_DEFAULT_VALUE = { red: 255, green: 55, blue: 90, alpha: 1 };

const SPACING_VALUE_ID = 'spacingValue';
const SPACING_CHOICE_ID = 'spacingChoice';

export const settings = defineSettings({
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: DoDontStyle.Icons,
            size: DropdownSize.Large,
            choices: [
                {
                    value: DoDontStyle.Icons,
                    icon: IconEnum.DoAndDont,
                    label: 'Icons',
                },
                {
                    value: DoDontStyle.Underline,
                    icon: IconEnum.TextFormatUnderline,
                    label: 'Underline',
                },
                {
                    value: DoDontStyle.Text,
                    icon: IconEnum.TextAlignmentLeft,
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'layout',
            label: 'Arrange',
            type: 'slider',
            defaultValue: DoDontLayout.SideBySide,
            info: "Side by Side: Dos & Don'ts are arranged in their respective categories next to one another. Stacked: Do's are arranged above, and Don'ts are below",
            choices: [
                {
                    value: DoDontLayout.SideBySide,
                    label: 'Side by side',
                },
                {
                    value: DoDontLayout.Stacked,
                    label: 'Stacked',
                },
            ],
        },
        {
            id: 'columns',
            label: 'Columns',
            type: 'slider',
            show: (bundle) => bundle.getBlock('layout')?.value === DoDontLayout.Stacked,
            defaultValue: 2,
            info: "The number of columns for Dos and Don'ts",
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
            id: 'isCustomSpacing',
            label: 'Gutter',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: "An official nerd's term for 'column gap'",
            onChange: (bundle) => presetCustomValue(bundle, SPACING_CHOICE_ID, SPACING_VALUE_ID, spacingValues),
            on: [
                {
                    id: SPACING_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, SPACING_VALUE_ID),
                },
            ],
            off: [
                {
                    id: SPACING_CHOICE_ID,
                    type: 'slider',
                    defaultValue: DoDontSpacing.Medium,
                    choices: [
                        {
                            value: DoDontSpacing.Small,
                            label: 'S',
                        },
                        {
                            value: DoDontSpacing.Medium,
                            label: 'M',
                        },
                        {
                            value: DoDontSpacing.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'doColor',
            type: 'colorInput',
            label: 'Do color',
            defaultValue: DO_COLOR_DEFAULT_VALUE,
        },
        {
            id: 'dontColor',
            type: 'colorInput',
            label: "Don't color",
            defaultValue: DONT_COLOR_DEFAULT_VALUE,
        },
    ],
});
