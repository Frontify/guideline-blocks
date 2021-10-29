/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StorybookStyle, StorybookTheme, StorybookBorderRadius } from './types';
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
                    icon: 'dos-text',
                    label: 'Icons',
                },
                {
                    value: StorybookStyle.WithoutAddons,
                    icon: 'dos-donts-underline',
                    label: 'Underline',
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
        {
            id: 'theme',
            label: 'Theme',
            info: 'Here comes the info',
            type: 'slider',
            defaultValue: StorybookTheme.Light,
            choices: [
                {
                    value: StorybookTheme.Light,
                    label: StorybookTheme.Light,
                },
                {
                    value: StorybookTheme.Dark,
                    label: StorybookTheme.Dark,
                },
            ],
        },
        { id: 'border', label: 'Border', type: 'switch' },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle) => bundle.getBlock('border').value === true,
            inputs: [
                {
                    id: 'test1',
                    type: 'input',
                },
                {
                    id: 'test2',
                    type: 'input',
                },
                {
                    id: 'test3',
                    type: 'input',
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
