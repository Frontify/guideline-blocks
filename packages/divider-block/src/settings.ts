/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { ApiBundle, ApiSettings } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    betweenPercentRule,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPercentRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import {
    DividerAlignment,
    DividerHeight,
    dividerHeightValues,
    DividerStyle,
    DividerThickness,
    dividerThicknessValues,
    DividerWidth,
} from './types';

const IS_LINE_ID = 'isLine';
const WIDTH_SIMPLE_ID = 'widthSimple';
const WIDTH_CUSTOM_ID = 'widthCustom';
const HEIGHT_CUSTOM_ID = 'heightCustom';
const THICKNESS_CUSTOM_ID = 'thicknessCustom';
const THICKNESS_SIMPLE_ID = 'thicknessSimple';
const HEIGHT_SIMPLE_ID = 'heightSimple';

export const IS_LINE_DEFAULT_VALUE = DividerStyle.Solid;
export const ALIGNMENT_DEFAULT_VALUE = DividerAlignment.Left;
export const STYLE_DEFAULT_VALUE = DividerStyle.Solid;
export const WIDTH_DEFAULT_VALUE = DividerWidth['100%'];
export const HEIGHT_DEFAULT_VALUE = DividerHeight.Small;
export const THICKNESS_DEFAULT_VALUE = DividerThickness.Small;
export const COLOR_DEFAULT_RGBA_VALUE = {
    hex: '#d5d6d6',
    rgba: { r: 213, g: 214, b: 214, a: 1 },
    name: 'Light Grey',
};

const solidStyleIsSelected = (bundle: ApiBundle): boolean => bundle.getBlock(IS_LINE_ID)?.value === DividerStyle.Solid;
const limitedWidthIsSelected = (bundle: ApiBundle): boolean =>
    bundle.getBlock(WIDTH_SIMPLE_ID)?.value !== DividerWidth['100%'] &&
    bundle.getBlock(WIDTH_CUSTOM_ID)?.value !== '100%';

const Settings: ApiSettings = {
    main: [
        {
            id: IS_LINE_ID,
            type: 'dropdown',
            size: 'Large',
            defaultValue: IS_LINE_DEFAULT_VALUE,
            choices: [
                {
                    value: DividerStyle.NoLine,
                    icon: IconEnum.LineSpacer,
                    label: 'Spacer (no line)',
                },
                {
                    value: DividerStyle.Solid,
                    icon: IconEnum.LineSolid,
                    label: 'Line',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'isWidthCustom',
            type: 'switch',
            label: 'Width',
            switchLabel: 'Custom',
            defaultValue: false,
            onChange: (bundle: ApiBundle): void =>
                presetCustomValue(bundle, WIDTH_SIMPLE_ID, WIDTH_CUSTOM_ID, DividerWidth),
            on: [
                {
                    id: WIDTH_CUSTOM_ID,
                    type: 'input',
                    placeholder: '75%',
                    clearable: false,
                    rules: [numericalOrPercentRule, betweenPercentRule(0, 100)],
                    onChange: (bundle: ApiBundle): void => appendUnit(bundle, WIDTH_CUSTOM_ID, '%'),
                },
            ],
            off: [
                {
                    id: WIDTH_SIMPLE_ID,
                    type: 'slider',
                    defaultValue: WIDTH_DEFAULT_VALUE,
                    choices: [
                        {
                            value: DividerWidth['10%'],
                            label: DividerWidth['10%'],
                        },
                        {
                            value: DividerWidth['25%'],
                            label: DividerWidth['25%'],
                        },
                        {
                            value: DividerWidth['50%'],
                            label: DividerWidth['50%'],
                        },
                        {
                            value: DividerWidth['100%'],
                            label: DividerWidth['100%'],
                        },
                    ],
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            info: 'Anchors the dividing line to the left, centre, or right of the page.',
            defaultValue: ALIGNMENT_DEFAULT_VALUE,
            choices: [
                {
                    value: DividerAlignment.Left,
                    icon: IconEnum.AlignLeft,
                },
                {
                    value: DividerAlignment.Center,
                    icon: IconEnum.AlignCenter,
                },
                {
                    value: DividerAlignment.Right,
                    icon: IconEnum.AlignRight,
                },
            ],
            show: (bundle: ApiBundle): boolean => solidStyleIsSelected(bundle) && limitedWidthIsSelected(bundle),
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            info: 'Determines the block height. This will not affect the dividing line in any way.',
            defaultValue: false,
            onChange: (bundle: ApiBundle): void =>
                presetCustomValue(bundle, HEIGHT_SIMPLE_ID, HEIGHT_CUSTOM_ID, dividerHeightValues),
            on: [
                {
                    id: HEIGHT_CUSTOM_ID,
                    type: 'input',
                    placeholder: '100px',
                    clearable: false,
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => appendUnit(bundle, HEIGHT_CUSTOM_ID),
                },
            ],
            off: [
                {
                    id: HEIGHT_SIMPLE_ID,
                    type: 'slider',
                    defaultValue: HEIGHT_DEFAULT_VALUE,
                    choices: [
                        {
                            value: DividerHeight.Small,
                            label: 'S',
                        },
                        {
                            value: DividerHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: DividerHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'style',
            type: 'slider',
            label: 'Type',
            defaultValue: STYLE_DEFAULT_VALUE,
            choices: [
                {
                    value: DividerStyle.Solid,
                    label: 'Solid',
                },
                {
                    value: DividerStyle.Dashed,
                    label: 'Dashes',
                },
                {
                    value: DividerStyle.Dotted,
                    label: 'Dots',
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'isThicknessCustom',
            type: 'switch',
            label: 'Thickness',
            switchLabel: 'Custom',
            defaultValue: false,
            onChange: (bundle: ApiBundle): void =>
                presetCustomValue(bundle, THICKNESS_SIMPLE_ID, THICKNESS_CUSTOM_ID, dividerThicknessValues),
            on: [
                {
                    id: THICKNESS_CUSTOM_ID,
                    type: 'input',
                    clearable: false,
                    rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(1)],
                    onChange: (bundle: ApiBundle): void => appendUnit(bundle, THICKNESS_CUSTOM_ID),
                },
            ],
            off: [
                {
                    id: THICKNESS_SIMPLE_ID,
                    type: 'slider',
                    defaultValue: THICKNESS_DEFAULT_VALUE,
                    choices: [
                        {
                            value: DividerThickness.Small,
                            label: 'S',
                        },
                        {
                            value: DividerThickness.Medium,
                            label: 'M',
                        },
                        {
                            value: DividerThickness.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'color',
            type: 'colorInput',
            label: 'Color',
            defaultValue: COLOR_DEFAULT_RGBA_VALUE,
            show: solidStyleIsSelected,
        },
    ],
};

export default Settings;
