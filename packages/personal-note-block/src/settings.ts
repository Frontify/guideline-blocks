/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { MultiInputLayout } from '@frontify/arcade';

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
        },
        {
            id: 'hasDateEdited',
            label: 'Date last edited',
            type: 'switch',
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
                },
            ],
            off: [
                {
                    id: 'paddingChoice',
                    type: 'slider',
                    defaultValue: NotePadding.None,
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
            defaultValue: '#CCCCCC',
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
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: '#CCCCCC',
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
            defaultValue: NoteVisibility.YouOnly,
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
