/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Color,
    DropdownSize,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

import { brandItemBrandItemSizeMap } from './types';

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
                            placeholder: 'Y Axis Top',
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
                    layout: MultiInputLayout.Columns,
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
                    ...getBorderSettings({ id: 'boardBorder', defaultColor: BOARD_BORDER_COLOR_DEFAULT_VALUE }),
                },
                {
                    ...getBorderRadiusSettings({ id: 'boardCornerRadius' }),
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
                    ...getBorderSettings({
                        id: 'brandItemBorder',
                        defaultColor: BRAND_ITEM_BORDER_COLOR_DEFAULT_VALUE,
                    }),
                },
                {
                    ...getBorderRadiusSettings({ id: 'brandItemCornerRadius' }),
                },
            ],
        },
    ],
});
