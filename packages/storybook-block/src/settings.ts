/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, MultiInputLayout } from '@frontify/arcade';
import { ApiBundle, ApiSettings } from '@frontify/guideline-blocks-settings';
import { numericalOrPixelRule, unitAutocomplete } from '@frontify/guideline-blocks-shared';
import {
    StorybookBorderRadius,
    StorybookBorderStyle,
    StorybookHeight,
    StorybookPosition,
    StorybookStyle,
} from './types';

export const BORDER_COLOR_DEFAULT_VALUE = { rgba: { r: 234, g: 235, b: 235, a: 1 }, name: 'Light Grey', hex: 'eaebeb' };

const STYLE_ID = 'style';
const HAS_BORDER_ID = 'hasBorder';
const HEIGHT_VALUE_ID = 'heightValue';
const BORDER_WIDTH_ID = 'borderWidth';
const BORDER_RADIUS_VALUE_ID = 'borderRadiusValue';

const settings: ApiSettings = {
    main: [
        {
            id: STYLE_ID,
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
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: '400px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => unitAutocomplete(bundle, HEIGHT_VALUE_ID),
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
            show: (bundle: ApiBundle): boolean => bundle.getBlock('style')?.value === StorybookStyle.Default,
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
            show: (bundle: ApiBundle): boolean => !!bundle.getBlock(HAS_BORDER_ID)?.value,
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
                    id: BORDER_WIDTH_ID,
                    type: 'input',
                    defaultValue: '1px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => unitAutocomplete(bundle, BORDER_WIDTH_ID),
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
            show: (bundle: ApiBundle): boolean => !!bundle.getBlock('hasBorder')?.value,
            defaultValue: false,
            on: [
                {
                    id: BORDER_RADIUS_VALUE_ID,
                    type: 'input',
                    placeholder: '1px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => unitAutocomplete(bundle, BORDER_RADIUS_VALUE_ID),
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
