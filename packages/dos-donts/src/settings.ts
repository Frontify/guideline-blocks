/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DoDontStyle, DoDontLayout, DoDontSpacing } from './types';

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
                    icon: 'dos-text',
                    label: 'Icons',
                },
                {
                    value: DoDontStyle.Underline,
                    icon: 'dos-donts-underline',
                    label: 'Underline',
                },
                {
                    value: DoDontStyle.Text,
                    icon: 'text-align-left',
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'layout',
            label: 'Arrange',
            info: 'Here comes the info',
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
            info: 'Here comes the info',
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
            id: 'spacing',
            label: 'Column gap',
            info: 'Here comes the infooo',
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
            type: 'input',
            label: 'Do color',
            defaultValue: '#00C8A5',
        },
        {
            id: 'dontColor',
            type: 'input',
            label: "Don't color",
            defaultValue: '#FF375A',
        },
    ],
};
