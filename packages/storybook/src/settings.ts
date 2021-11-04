/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    StorybookStyle,
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
} from './types';
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
    layout: [
        {
            id: 'isCustomHeight',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'heightValue',
                    type: 'input',
                },
            ],
            off: [
                {
                    id: 'heightChoice',
                    type: 'slider',
                    defaultValue: StorybookHeight.Medium,
                    choices: [
                        {
                            value: StorybookHeight.Small,
                            label: 'S',
                        },
                        {
                            value: StorybookHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: StorybookHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
        {
            id: 'positioning',
            label: 'Positioning',
            type: 'slider',
            defaultValue: StorybookPosition.Horizontal,
            show: (bundle) => bundle.getBlock('style').value === StorybookStyle.Default,
            choices: [
                {
                    value: StorybookPosition.Horizontal,
                    icon: 'figure-text-right',
                },
                {
                    value: StorybookPosition.Vertical,
                    icon: 'figure-text-bottom',
                },
            ],
        },
    ],
    style: [
        { id: 'hasBorder', label: 'Border', type: 'switch' },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle) => bundle.getBlock('hasBorder').value === true,
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
            id: 'hasCustomBorderRadius',
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
            show: (bundle) => bundle.getBlock('hasBorder').value === true,
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
