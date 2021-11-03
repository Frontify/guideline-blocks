/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CalloutAlignment, CalloutCornerRadius, CalloutPadding, CalloutType, CalloutWidth } from "./types";

export default {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: CalloutType.WARNING,
            size: 'large',
            disabled: false,
            choices: [
                {
                    value: CalloutType.WARNING,
                    icon: 'callout',
                    label: 'Warning',
                },
                {
                    value: CalloutType.TIP,
                    icon: 'check',
                    label: 'Tip',
                },
                {
                    value: CalloutType.NOTE,
                    icon: 'briefing',
                    label: 'Note',
                },
                {
                    value: CalloutType.INFO,
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
                }
            ],
        },
    ],
    layout: [
        {
            id: 'width',
            type: 'slider',
            label: 'Width',
            info: 'TBD',
            defaultValue: CalloutWidth.FULL_WIDTH,
            choices: [
                {
                    label: 'Full Width',
                    value: CalloutWidth.FULL_WIDTH,
                },
                {
                    label: 'Hug Contents',
                    value: CalloutWidth.HUG_CONTENTS,
                },
            ],
        },
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            defaultValue: CalloutAlignment.LEFT,
            choices: [
                {
                    value: CalloutAlignment.LEFT,
                    label: '',
                    icon: 'align-left',
                },
                {
                    value: CalloutAlignment.CENTER,
                    label: '',
                    icon: 'align-center',
                },
                {
                    value: CalloutAlignment.RIGHT,
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
            label:'Padding',
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
                    defaultValue: CalloutPadding.M,
                    choices: [
                        {
                            value: CalloutPadding.S,
                            label: 'S',
                        },
                        {
                            value: CalloutPadding.M,
                            label: 'M',
                        },
                        {
                            value: CalloutPadding.L,
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
            label:'Corner radius',
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
                    defaultValue: CalloutCornerRadius.NONE,
                    choices: [
                        {
                            value: CalloutCornerRadius.NONE,
                            label: 'None'
                        },
                        {
                            value: CalloutCornerRadius.S,
                            label: 'S',
                        },
                        {
                            value: CalloutCornerRadius.M,
                            label: 'M',
                        },
                        {
                            value: CalloutCornerRadius.L,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};
