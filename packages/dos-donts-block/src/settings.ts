/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DoDontStyle, DoDontLayout, DoDontSpacing } from './types';
import { IconEnum } from '@frontify/arcade';

export const DO_COLOR_DEFAULT_VALUE = { rgba: { r: 0, g: 200, b: 165, a: 1 } };
export const DONT_COLOR_DEFAULT_VALUE = { rgba: { r: 255, g: 55, b: 90, a: 1 } };

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: DoDontStyle.Icons,
            size: 'large',
            choices: [
                {
                    value: DoDontStyle.Icons,
                    icon: IconEnum.DosText,
                    label: 'Icons',
                },
                {
                    value: DoDontStyle.Underline,
                    icon: IconEnum.DoDontsUnderline,
                    label: 'Underline',
                },
                {
                    value: DoDontStyle.Text,
                    icon: IconEnum.TextAlignLeft,
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
            show: (bundle) => bundle.getBlock('layout').value === DoDontLayout.Stacked,
            defaultValue: 2,
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
            label: 'Column gap',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'spacingValue',
                    type: 'input',
                },
            ],
            off: [
                {
                    id: 'spacingChoice',
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
};
