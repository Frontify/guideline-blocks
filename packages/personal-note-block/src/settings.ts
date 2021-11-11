/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { IconEnum, MultiInputLayout } from '@frontify/arcade';
import { numericalOrPixelRule, pxAutocomplete } from '@frontify/guideline-blocks-shared';

export const BACKGROUND_COLOR_DEFAULT_VALUE = { rgba: { r: 255, g: 255, b: 255, a: 1 }, name: 'White' };
export const BORDER_COLOR_DEFAULT_VALUE = { rgba: { r: 234, g: 235, b: 235, a: 1 }, name: 'Light Grey' };

const PADDING_VALUE_ID = 'paddingValue';
const HAS_BACKGROUND_ID = 'hasBackground';
const HAS_BORDER_ID = 'hasBorder';
const BORDER_WIDTH_ID = 'borderWidth';
const BORDER_RADIUS_VALUE_ID = 'borderRadiusValue';

export const BACKGROUND_COLOR_DEFAULT_VALUE = { rgba: { r: 255, g: 255, b: 255, a: 1 } };
export const BORDER_COLOR_DEFAULT_VALUE = { rgba: { r: 234, g: 235, b: 235, a: 1 } };

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: NoteStyle.Card,
            size: 'Large',
            choices: [
                {
                    value: NoteStyle.Card,
                    icon: IconEnum.Cards,
                    label: 'Card',
                },
            ],
            disabled: true,
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
                    id: PADDING_VALUE_ID,
                    type: 'input',
                    placeholder: '20px',
                    rules: [numericalOrPixelRule],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (bundle: any): void => pxAutocomplete(bundle, PADDING_VALUE_ID),
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
            id: HAS_BACKGROUND_ID,
            label: 'Background',
            type: 'switch',
            defaultValue: false,
        },
        {
            id: 'backgroundColor',
            type: 'colorInput',
            defaultValue: BACKGROUND_COLOR_DEFAULT_VALUE,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            show: (bundle: any): void => bundle.getBlock(HAS_BACKGROUND_ID).value,
        },
        {
            id: HAS_BORDER_ID,
            label: 'Border',
            type: 'switch',
            defaultValue: true,
        },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            show: (bundle: any): void => bundle.getBlock(HAS_BORDER_ID).value,
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
                    id: BORDER_WIDTH_ID,
                    type: 'input',
                    defaultValue: '1px',
                    rules: [numericalOrPixelRule],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (bundle: any): void => pxAutocomplete(bundle, BORDER_WIDTH_ID),
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            show: (bundle: any): void => bundle.getBlock(HAS_BORDER_ID).value,
            on: [
                {
                    id: BORDER_RADIUS_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (bundle: any): void => pxAutocomplete(bundle, BORDER_RADIUS_VALUE_ID),
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
