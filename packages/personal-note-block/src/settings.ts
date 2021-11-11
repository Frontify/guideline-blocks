/* (c) Copyright Frontify Ltd., all rights reserved. */

import { numericalPixelValueRule } from './rules';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { MultiInputLayout } from '@frontify/arcade';

export const BACKGROUND_COLOR_DEFAULT_VALUE = { rgba: { r: 255, g: 255, b: 255, a: 1 } };
export const BORDER_COLOR_DEFAULT_VALUE = { rgba: { r: 234, g: 235, b: 235, a: 1 } };

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: NoteStyle.Card,
            size: 'large',
            choices: [
                {
                    value: NoteStyle.Card,
                    icon: 'card',
                    label: 'Card',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'hasAvatarName',
            label: 'Avatar and name',
            type: 'switch',
            defaultValue: true,
        },
        {
            id: 'hasDateEdited',
            label: 'Date last edited',
            type: 'switch',
            defaultValue: true,
        },
        {
            id: 'hasCustomPadding',
            label: 'Padding',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'paddingValue',
                    type: 'input',
                    placeholder: '20px',
                    rules: [numericalPixelValueRule],
                    onChange: (bundle: any): void => {
                        const paddingValue = Number(bundle.getBlock('paddingValue')?.value);
                        if (!Number.isNaN(paddingValue)) {
                            bundle.setBlockValue('paddingValue', `${paddingValue}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'paddingChoice',
                    type: 'slider',
                    defaultValue: NotePadding.Small,
                    choices: [
                        {
                            value: NotePadding.None,
                            label: 'None',
                        },
                        {
                            value: NotePadding.Small,
                            label: 'S',
                        },
                        {
                            value: NotePadding.Medium,
                            label: 'M',
                        },
                        {
                            value: NotePadding.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'hasBackground',
            label: 'Background',
            type: 'switch',
        },
        {
            id: 'backgroundColor',
            type: 'colorInput',
            defaultValue: BACKGROUND_COLOR_DEFAULT_VALUE,
            show: (bundle) => bundle.getBlock('hasBackground').value,
        },
        {
            id: 'hasBorder',
            label: 'Border',
            type: 'switch',
        },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle) => bundle.getBlock('hasBorder').value,
            blocks: [
                {
                    id: 'borderStyle',
                    type: 'dropdown',
                    defaultValue: NoteBorderStyle.Solid,
                    choices: [
                        {
                            value: NoteBorderStyle.Solid,
                            label: 'Solid',
                        },
                        {
                            value: NoteBorderStyle.Dotted,
                            label: 'Dotted',
                        },
                        {
                            value: NoteBorderStyle.Dashed,
                            label: 'Dashed',
                        },
                    ],
                },
                {
                    id: 'borderWidth',
                    type: 'input',
                    defaultValue: '1px',
                    rules: [numericalPixelValueRule],
                    onChange: (bundle: any): void => {
                        const borderWidth = Number(bundle.getBlock('borderWidth')?.value);
                        if (!Number.isNaN(borderWidth)) {
                            bundle.setBlockValue('borderWidth', `${borderWidth}px`);
                        }
                    },
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                },
            ],
        },
        {
            id: 'hasCustomBorderRadius',
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
            show: (bundle) => bundle.getBlock('hasBorder').value,
            on: [
                {
                    id: 'borderRadiusValue',
                    type: 'input',
                    rules: [numericalPixelValueRule],
                    onChange: (bundle: any): void => {
                        const borderRadiusValue = Number(bundle.getBlock('borderRadiusValue')?.value);
                        if (!Number.isNaN(borderRadiusValue)) {
                            bundle.setBlockValue('hasCustomBorderRadius', `${borderRadiusValue}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'borderRadiusChoice',
                    type: 'slider',
                    defaultValue: NoteBorderRadius.None,
                    choices: [
                        {
                            value: NoteBorderRadius.None,
                            label: 'None',
                        },
                        {
                            value: NoteBorderRadius.Small,
                            label: 'S',
                        },
                        {
                            value: NoteBorderRadius.Medium,
                            label: 'M',
                        },
                        {
                            value: NoteBorderRadius.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    security: [
        {
            id: 'visibility',
            type: 'slider',
            label: 'Visible to',
            defaultValue: NoteVisibility.Everyone,
            choices: [
                {
                    value: NoteVisibility.YouOnly,
                    label: 'You only',
                },
                {
                    value: NoteVisibility.Editors,
                    label: 'Editors',
                },
                {
                    value: NoteVisibility.Everyone,
                    label: 'Everyone',
                },
            ],
        },
    ],
};
