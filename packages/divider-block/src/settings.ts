/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
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
    DividerStyle,
    DividerThickness,
    DividerWidth,
    dividerHeightValues,
    dividerThicknessValues,
} from './types';

const IS_LINE_ID = 'isLine';
const WIDTH_SIMPLE_ID = 'widthSimple';
const WIDTH_CUSTOM_ID = 'widthCustom';
const HEIGHT_CUSTOM_ID = 'heightCustom';
const THICKNESS_CUSTOM_ID = 'thicknessCustom';
const THICKNESS_SIMPLE_ID = 'thicknessSimple';
const HEIGHT_SIMPLE_ID = 'heightSimple';
const IS_CUSTOM_WIDTH_ID = 'isWidthCustom';

export const IS_LINE_DEFAULT_VALUE = DividerStyle.Solid;
export const ALIGNMENT_DEFAULT_VALUE = DividerAlignment.Left;
export const STYLE_DEFAULT_VALUE = DividerStyle.Solid;
export const WIDTH_DEFAULT_VALUE = DividerWidth['100%'];
export const HEIGHT_DEFAULT_VALUE = DividerHeight.Small;
export const THICKNESS_DEFAULT_VALUE = DividerThickness.Small;
export const COLOR_DEFAULT_RGBA_VALUE = {
    r: 213,
    g: 214,
    b: 214,
    a: 1,
    name: 'Light Grey',
};

const lineIsSelected = (bundle: Bundle): boolean => bundle.getBlock(IS_LINE_ID)?.value === DividerStyle.Solid;
const limitedWidthIsSelected = (bundle: Bundle): boolean =>
    bundle.getBlock(IS_CUSTOM_WIDTH_ID)?.value
        ? bundle.getBlock(WIDTH_CUSTOM_ID)?.value !== DividerWidth['100%']
        : bundle.getBlock(WIDTH_SIMPLE_ID)?.value !== DividerWidth['100%'];

const settings: BlockSettings = {
    main: [
        {
            id: IS_LINE_ID,
            type: 'dropdown',
            size: DropdownSize.Large,
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
            id: 'lineLayoutSection',
            type: 'sectionHeading',
            label: 'Line',
            show: lineIsSelected,
            blocks: [
                {
                    id: IS_CUSTOM_WIDTH_ID,
                    type: 'switch',
                    label: 'Width',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle: Bundle): void =>
                        presetCustomValue(bundle, WIDTH_SIMPLE_ID, WIDTH_CUSTOM_ID, DividerWidth),
                    on: [
                        {
                            id: WIDTH_CUSTOM_ID,
                            type: 'input',
                            placeholder: '75%',
                            clearable: false,
                            rules: [numericalOrPercentRule, betweenPercentRule(0, 100)],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, WIDTH_CUSTOM_ID, '%'),
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
                    show: limitedWidthIsSelected,
                },
            ],
        },
        {
            id: 'blockHeightSection',
            type: 'sectionHeading',
            label: 'Block',
            blocks: [
                {
                    id: 'isHeightCustom',
                    type: 'switch',
                    label: 'Block Height',
                    switchLabel: 'Custom',
                    info: 'Determines the block height. This will not affect the dividing line in any way.',
                    defaultValue: false,
                    onChange: (bundle: Bundle): void =>
                        presetCustomValue(bundle, HEIGHT_SIMPLE_ID, HEIGHT_CUSTOM_ID, dividerHeightValues),
                    on: [
                        {
                            id: HEIGHT_CUSTOM_ID,
                            type: 'input',
                            placeholder: '100px',
                            clearable: false,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, HEIGHT_CUSTOM_ID),
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
        },
    ],
    style: [
        {
            id: 'lineStyleSection',
            type: 'sectionHeading',
            label: 'Line',
            show: lineIsSelected,
            blocks: [
                {
                    id: 'style',
                    type: 'slider',
                    label: 'Styling',
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
                },
                {
                    id: 'isThicknessCustom',
                    type: 'switch',
                    label: 'Thickness',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle: Bundle): void =>
                        presetCustomValue(bundle, THICKNESS_SIMPLE_ID, THICKNESS_CUSTOM_ID, dividerThicknessValues),
                    on: [
                        {
                            id: THICKNESS_CUSTOM_ID,
                            type: 'input',
                            clearable: false,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(1)],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, THICKNESS_CUSTOM_ID),
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
                },
                {
                    id: 'color',
                    type: 'colorInput',
                    label: 'Color',
                    defaultValue: COLOR_DEFAULT_RGBA_VALUE,
                },
            ],
        },
    ],
};

export default settings;
