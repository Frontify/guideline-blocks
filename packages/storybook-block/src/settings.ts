/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, MultiInputLayout } from '@frontify/arcade';
import { ApiSettings } from '@frontify/guideline-blocks-settings';
import {
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
} from './types';

const settings: ApiSettings = {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: StorybookStyle.Default,
            size: 'Large',
            choices: [
                {
                    value: StorybookStyle.Default,
                    icon: IconEnum.Iframe,
                    label: 'Story (with add-ons)',
                },
                {
                    value: StorybookStyle.WithoutAddons,
                    icon: IconEnum.Iframe,
                    label: 'Story (no add-ons)',
                },
            ],
        },
    ],
    content: [
        {
            id: 'url',
            label: 'Link',
            type: 'input',
        },
    ],
    layout: [
        {
            id: 'isCustomHeight',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
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
            show: (bundle) => bundle.getBlock('style')?.value === StorybookStyle.Default,
            choices: [
                {
                    value: StorybookPosition.Horizontal,
                    icon: IconEnum.FigureTextRight,
                },
                {
                    value: StorybookPosition.Vertical,
                    icon: IconEnum.FigureTextBottom,
                },
            ],
        },
    ],
    style: [
        {
            id: 'hasBorder',
            label: 'Border',
            type: 'switch',
            defaultValue: false,
        },
        {
            id: 'borderSelection',
            type: 'multiInput',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: true,
            show: (bundle) => !!bundle.getBlock('hasBorder')?.value,
            blocks: [
                {
                    id: 'borderStyle',
                    type: 'dropdown',
                    defaultValue: StorybookBorderStyle.Solid,
                    choices: [
                        {
                            value: StorybookBorderStyle.Solid,
                            label: 'Solid',
                        },
                        {
                            value: StorybookBorderStyle.Dotted,
                            label: 'Dotted',
                        },
                        {
                            value: StorybookBorderStyle.Dashed,
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
                    defaultValue: { hex: '#CCCCCC' },
                },
            ],
        },
        {
            id: 'hasCustomBorderRadius',
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
            show: (bundle) => !!bundle.getBlock('hasBorder')?.value,
            defaultValue: false,
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

export default settings;
