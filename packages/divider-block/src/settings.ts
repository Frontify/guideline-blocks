/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    betweenPercentRule,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPercentRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import { DividerAlignment, DividerHeight, DividerStyle, DividerWidth, dividerHeightValues } from './types';

const IS_LINE_ID = 'isLine';
const WIDTH_SIMPLE_ID = 'widthSimple';
const WIDTH_CUSTOM_ID = 'widthCustom';
const HEIGHT_SIMPLE_ID = 'heightSimple';
const HEIGHT_CUSTOM_ID = 'heightCustom';
const IS_CUSTOM_WIDTH_ID = 'isWidthCustom';
const THICKNESS_ID = 'thickness';

export const ALIGNMENT_DEFAULT_VALUE = DividerAlignment.Left;
export const STYLE_DEFAULT_VALUE = DividerStyle.Solid;
export const HEIGHT_DEFAULT_VALUE = DividerHeight.Small;
export const COLOR_DEFAULT_RGBA_VALUE = {
    red: 213,
    green: 214,
    blue: 214,
    alpha: 1,
    name: 'Light Grey',
};

const lineIsSelected = (bundle: Bundle): boolean => bundle.getBlock(IS_LINE_ID)?.value === DividerStyle.Solid;
const limitedWidthIsSelected = (bundle: Bundle): boolean =>
    bundle.getBlock(IS_CUSTOM_WIDTH_ID)?.value
        ? bundle.getBlock(WIDTH_CUSTOM_ID)?.value !== DividerWidth['100%']
        : bundle.getBlock(WIDTH_SIMPLE_ID)?.value !== DividerWidth['100%'];

export const settings: BlockSettings = {
    main: [
        {
            id: IS_LINE_ID,
            type: 'dropdown',
            size: 'Large' as DropdownSize.Large,
            defaultValue: DividerStyle.Solid,
            choices: [
                {
                    value: DividerStyle.NoLine,
                    icon: 'DividerBlank' as IconEnum.DividerBlank,
                    label: 'Spacer (no line)',
                },
                {
                    value: DividerStyle.Solid,
                    icon: 'DividerSolid' as IconEnum.DividerSolid,
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
                            placeholder: 'e.g. 60%',
                            clearable: true,
                            rules: [numericalOrPercentRule, betweenPercentRule(0, 100)],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, WIDTH_CUSTOM_ID, '%'),
                        },
                    ],
                    off: [
                        {
                            id: WIDTH_SIMPLE_ID,
                            type: 'slider',
                            defaultValue: DividerWidth['100%'],
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
                            icon: 'ArrowAlignLeft' as IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: DividerAlignment.Center,
                            icon: 'ArrowAlignVerticalCentre' as IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: DividerAlignment.Right,
                            icon: 'ArrowAlignRight' as IconEnum.ArrowAlignRight,
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
                            placeholder: 'e.g. 50px',
                            clearable: true,
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
                    id: 'lineStyle',
                    type: 'multiInput',
                    onChange: (bundle: Bundle): void => {
                        appendUnit(bundle, THICKNESS_ID);
                    },
                    layout: MultiInputLayout.Columns,
                    lastItemFullWidth: true,
                    blocks: [
                        {
                            id: 'style',
                            type: 'dropdown',
                            label: 'Styling',
                            defaultValue: STYLE_DEFAULT_VALUE,
                            choices: [
                                {
                                    value: DividerStyle.Solid,
                                    label: 'Solid',
                                },
                                {
                                    value: DividerStyle.Dotted,
                                    label: 'Dots',
                                },
                                {
                                    value: DividerStyle.Dashed,
                                    label: 'Dashes',
                                },
                            ],
                        },
                        {
                            id: THICKNESS_ID,
                            type: 'input',
                            label: 'Thickness',
                            defaultValue: '1px',
                            placeholder: 'e.g. 3px',
                            clearable: false,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(1)],
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
        },
    ],
};
