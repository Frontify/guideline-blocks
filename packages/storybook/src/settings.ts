/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StorybookStyle, StorybookBorderRadius, StorybookBorderStyle } from './types';
import { MultiInputLayout } from '@frontify/arcade';

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: StorybookStyle.Default,
            size: 'large',
            choices: [
                {
                    value: StorybookStyle.Default,
                    icon: 'iframe',
                    label: 'Story (with add-ons)',
                },
                {
                    value: StorybookStyle.WithoutAddons,
                    icon: 'iframe',
                    label: 'Story (no add-ons)',
                },
            ],
        },
    ],
    content: [
        {
            id: 'url',
            label: 'Storybook-URL',
            type: 'input',
        },
    ],
    style: [
        { id: 'border', label: 'Border', type: 'switch' },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle) => bundle.getBlock('border').value === true,
            inputs: [
                {
                    id: 'borderStyle',
                    type: 'dropdown',
                    defaultValue: StorybookBorderStyle.Solid,
                    choices: [
                        {
                            value: StorybookBorderStyle.Solid,
                            label: StorybookBorderStyle.Solid,
                        },
                        {
                            value: StorybookBorderStyle.Dotted,
                            label: StorybookBorderStyle.Dotted,
                        },
                        {
                            value: StorybookBorderStyle.Dashed,
                            label: StorybookBorderStyle.Dashed,
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
                    type: 'input',
                    defaultValue: '#CCCCCC',
                },
            ],
        },
        {
            id: 'borderRadius',
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
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
                    defaultValue: StorybookBorderRadius.None,
                    choices: [
                        {
                            value: StorybookBorderRadius.None,
                            label: 'None',
                        },
                        {
                            value: StorybookBorderRadius.Small,
                            label: 'S',
                        },
                        {
                            value: StorybookBorderRadius.Medium,
                            label: 'M',
                        },
                        {
                            value: StorybookBorderRadius.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};
