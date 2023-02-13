/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    appendUnit,
    AssetChooserObjectType,
    AssetInputMode,
    Color,
    defineSettings,
    DropdownSize,
    MultiInputLayout,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { brandItemBrandItemSizeMap, cornerRadiusMap } from './types';

const WHITE_COLOR_VALUE: Color = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    name: 'White',
};

const GREY_COLOR_VALUE: Color = {
    red: 173,
    green: 173,
    blue: 173,
    alpha: 1,
    name: 'Grey',
};

const LIGHT_GREY_COLOR_VALUE: Color = {
    red: 8,
    green: 8,
    blue: 8,
    alpha: 0.1,
    name: 'Light Grey',
};

const BOARD_AXIS_LINES_COLOR_DEFAULT_VALUE = LIGHT_GREY_COLOR_VALUE;
const BOARD_AXIS_LABELS_COLOR_DEFAULT_VALUE = GREY_COLOR_VALUE;
const BOARD_BACKGROUND_COLOR_DEFAULT_VALUE = WHITE_COLOR_VALUE;
const BOARD_BORDER_COLOR_DEFAULT_VALUE = LIGHT_GREY_COLOR_VALUE;

const BRAND_ITEM_BACKGROUND_COLOR_DEFAULT_VALUE = WHITE_COLOR_VALUE;
const BRAND_ITEM_BORDER_COLOR_DEFAULT_VALUE = LIGHT_GREY_COLOR_VALUE;

export const settings = defineSettings({
    basics: [
        {
            id: 'brands',
            type: 'sectionHeading',
            label: 'Brands',
            blocks: [
                {
                    id: 'brandAssetImages',
                    type: 'assetInput',
                    label: 'Images',
                    info: 'Placeholder tooltip',
                    projectTypes: [], // TODO: Ask about the type
                    objectTypes: [AssetChooserObjectType.ImageVideo], // TODO: Maybe ask Luca about this
                    mode: AssetInputMode.BrowseAndUpload,
                    multiSelection: true,
                },
            ],
        },
        {
            id: 'brandItem',
            type: 'sectionHeading',
            label: 'Brand item',
            blocks: [
                {
                    id: 'isBrandItemCustom',
                    type: 'switch',
                    label: 'Size',
                    switchLabel: 'Custom',
                    info: 'Placeholder tooltip',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(
                            bundle,
                            'brandItemSizeSimple',
                            'brandItemSizeCustom',
                            brandItemBrandItemSizeMap
                        );
                    },
                    on: [
                        {
                            id: 'brandItemSizeCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'brandItemSizeCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'brandItemSizeSimple',
                            type: 'slider',
                            defaultValue: 'small',
                            choices: [
                                {
                                    value: 'small',
                                    label: 'S',
                                },
                                {
                                    value: 'medium',
                                    label: 'M',
                                },
                                {
                                    value: 'large',
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'axes',
            type: 'sectionHeading',
            label: 'Axes',
            blocks: [
                {
                    id: 'test',
                    type: 'multiInput',
                    label: 'Labels',
                    info: 'Placeholder tooltip',
                    layout: MultiInputLayout.Spider,
                    blocks: [
                        {
                            id: 'yAxisTopLabel',
                            type: 'input',
                            placeholder: 'Y Axis Top', // TODO: Check with Magda
                            defaultValue: 'Y Axis Top',
                        },
                        {
                            id: 'xAxisLeftLabel',
                            type: 'input',
                            placeholder: 'X Axis Left',
                            defaultValue: 'X Axis Left',
                        },
                        {
                            id: 'xAxisRightLabel',
                            type: 'input',
                            placeholder: 'X Axis Right',
                            defaultValue: 'X Axis Right',
                        },
                        {
                            id: 'yAxisBottomLabel',
                            type: 'input',
                            placeholder: 'Y Axis Bottom Label',
                            defaultValue: 'Y Axis Bottom Label',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'board',
            type: 'sectionHeading',
            label: 'Board',
            blocks: [
                {
                    id: 'boardAxisLines',
                    type: 'multiInput',
                    label: 'Axis lines',
                    lastItemFullWidth: true,
                    blocks: [
                        {
                            id: 'boardAxisLinesStyle',
                            type: 'dropdown',
                            defaultValue: 'solid',
                            size: DropdownSize.Small,
                            choices: [
                                {
                                    value: 'dotted',
                                    label: 'Dotted',
                                },
                                {
                                    value: 'dashed',
                                    label: 'Dashed',
                                },
                                {
                                    value: 'solid',
                                    label: 'Solid',
                                },
                            ],
                        },
                        {
                            id: 'boardAxisLinesWidth',
                            type: 'input',
                            defaultValue: '1px',
                            placeholder: '1px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'boardAxisLinesWidth');
                            },
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: BOARD_AXIS_LINES_COLOR_DEFAULT_VALUE,
                        },
                    ],
                    layout: MultiInputLayout.Columns,
                },
                {
                    id: 'boardAxisLabelsColor',
                    type: 'colorInput',
                    label: 'Axis labels',
                    defaultValue: BOARD_AXIS_LABELS_COLOR_DEFAULT_VALUE,
                },
                {
                    id: 'boardBackgroundColor',
                    type: 'colorInput',
                    label: 'Background',
                    defaultValue: BOARD_BACKGROUND_COLOR_DEFAULT_VALUE,
                },
                {
                    id: 'boardBorderGroup',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Border',
                    on: [
                        {
                            id: 'boardBorder',
                            type: 'multiInput',
                            lastItemFullWidth: true,
                            blocks: [
                                {
                                    id: 'boardBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    size: DropdownSize.Small,
                                    choices: [
                                        {
                                            value: 'dotted',
                                            label: 'Dotted',
                                        },
                                        {
                                            value: 'dashed',
                                            label: 'Dashed',
                                        },
                                        {
                                            value: 'solid',
                                            label: 'Solid',
                                        },
                                    ],
                                },
                                {
                                    id: 'boardBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    placeholder: '1px',
                                    rules: [numericalOrPixelRule],
                                    onChange: (bundle) => {
                                        appendUnit(bundle, 'boardBorderWidth');
                                    },
                                },
                                {
                                    id: 'boardBorderColor',
                                    type: 'colorInput',
                                    defaultValue: BOARD_BORDER_COLOR_DEFAULT_VALUE,
                                },
                            ],
                            layout: MultiInputLayout.Columns,
                        },
                    ],
                },
                {
                    id: 'isBoardCornerRadiusCustom',
                    type: 'switch',
                    label: 'Corner radius',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(
                            bundle,
                            'boardCornerRadiusSimple',
                            'boardCornerRadiusCustom',
                            cornerRadiusMap
                        );
                    },
                    on: [
                        {
                            id: 'boardCornerRadiusCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'brandItemSizeCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'boardCornerRadiusSimple',
                            type: 'slider',
                            defaultValue: 'medium',
                            choices: [
                                {
                                    value: 'small',
                                    label: 'S',
                                },
                                {
                                    value: 'medium',
                                    label: 'M',
                                },
                                {
                                    value: 'large',
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'brandItem',
            type: 'sectionHeading',
            label: 'Brand item',
            blocks: [
                {
                    id: 'brandItemBackground',
                    type: 'colorInput',
                    label: 'Background',
                    defaultValue: BRAND_ITEM_BACKGROUND_COLOR_DEFAULT_VALUE,
                },
                {
                    id: 'brandItemBorderGroup',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Border',
                    on: [
                        {
                            id: 'brandItemBorder',
                            type: 'multiInput',
                            lastItemFullWidth: true,
                            blocks: [
                                {
                                    id: 'brandItemBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    size: DropdownSize.Small,
                                    choices: [
                                        {
                                            value: 'dotted',
                                            label: 'Dotted',
                                        },
                                        {
                                            value: 'dashed',
                                            label: 'Dashed',
                                        },
                                        {
                                            value: 'solid',
                                            label: 'Solid',
                                        },
                                    ],
                                },
                                {
                                    id: 'brandItemBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    placeholder: '1px',
                                    rules: [numericalOrPixelRule],
                                    onChange: (bundle) => {
                                        appendUnit(bundle, 'brandItemBorderWidth');
                                    },
                                },
                                {
                                    id: 'brandItemBorderColor',
                                    type: 'colorInput',
                                    defaultValue: BRAND_ITEM_BORDER_COLOR_DEFAULT_VALUE,
                                },
                            ],
                            layout: MultiInputLayout.Columns,
                        },
                    ],
                },
                {
                    id: 'isBrandIteCornerRadiusCustom',
                    type: 'switch',
                    label: 'Corner radius',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(
                            bundle,
                            'brandItemCornerRadiusSimple',
                            'brandItemCornerRadiusCustom',
                            cornerRadiusMap
                        );
                    },
                    on: [
                        {
                            id: 'brandItemCornerRadiusCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'brandItemSizeCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'brandItemCornerRadiusSimple',
                            type: 'slider',
                            defaultValue: 'medium',
                            choices: [
                                {
                                    value: 'small',
                                    label: 'S',
                                },
                                {
                                    value: 'medium',
                                    label: 'M',
                                },
                                {
                                    value: 'large',
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
