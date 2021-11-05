/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Alignment, CornerRadius, Padding, Type, Width } from './types';

export default {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: Type.Warning,
            size: 'large',
            disabled: false,
            choices: [
                {
                    value: Type.Warning,
                    icon: 'callout',
                    label: 'Warning',
                },
                {
                    value: Type.Tip,
                    icon: 'check',
                    label: 'Tip',
                },
                {
                    value: Type.Note,
                    icon: 'briefing',
                    label: 'Note',
                },
                {
                    value: Type.Info,
                    icon: 'info',
                    label: 'Info',
                },
            ],
        },
    ],
    content: [
        {
            id: 'iconSwitch',
            type: 'switch',
            defaultValue: true,
            label: 'Icon',
            on: [
                {
                    id: 'icon',
                    type: 'assetInput',
                    allowedExtensions: ['svg'],
                },
            ],
        },
    ],
    layout: [
        {
            id: 'width',
            type: 'slider',
            label: 'Width',
            info: 'TBD',
            defaultValue: Width.FullWidth,
            choices: [
                {
                    label: 'Full Width',
                    value: Width.FullWidth,
                },
                {
                    label: 'Hug Contents',
                    value: Width.HugContents,
                },
            ],
        },
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            defaultValue: Alignment.Left,
            choices: [
                {
                    value: Alignment.Left,
                    label: '',
                    icon: 'align-left',
                },
                {
                    value: Alignment.Center,
                    label: '',
                    icon: 'align-center',
                },
                {
                    value: Alignment.Right,
                    label: '',
                    icon: 'align-right',
                },
            ],
        },
        {
            id: 'customPaddingSwitch',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Padding',
            on: [
                {
                    id: 'customPadding',
                    type: 'multiInput',
                    layout: 'Spider',
                    inputs: [
                        {
                            id: 'top-input',
                            type: 'input',
                            label: 'Top',
                        },
                        {
                            id: 'left-input',
                            type: 'input',
                            label: 'Left',
                        },
                        {
                            id: 'right-input',
                            type: 'input',
                            label: 'Right',
                        },
                        {
                            id: 'bottom-input',
                            type: 'input',
                            label: 'Bottom',
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'padding',
                    type: 'slider',
                    defaultValue: Padding.M,
                    choices: [
                        {
                            value: Padding.S,
                            label: 'S',
                        },
                        {
                            value: Padding.M,
                            label: 'M',
                        },
                        {
                            value: Padding.L,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'customCornerRadiusSwitch',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Corner radius',
            on: [
                {
                    id: 'customCornerRadius',
                    type: 'multiInput',
                    layout: 'Columns',
                    inputs: [
                        {
                            id: 'top-left-input',
                            type: 'input',
                            label: 'Top Left',
                        },
                        {
                            id: 'top-right-input',
                            type: 'input',
                            label: 'Top Right',
                        },
                        {
                            id: 'bottom-left-input',
                            type: 'input',
                            label: 'Bottom Left',
                        },
                        {
                            id: 'bottom-right-input',
                            type: 'input',
                            label: 'Bottom Right',
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'cornerRadius',
                    type: 'slider',
                    defaultValue: CornerRadius.None,
                    choices: [
                        {
                            value: CornerRadius.None,
                            label: 'None',
                        },
                        {
                            value: CornerRadius.S,
                            label: 'S',
                        },
                        {
                            value: CornerRadius.M,
                            label: 'M',
                        },
                        {
                            value: CornerRadius.L,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};
