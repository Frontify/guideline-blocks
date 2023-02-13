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

import { brandItemBrandItemSizeMap } from './types';

const BORDER_COLOR_DEFAULT_VALUE: Color = {
    red: 8,
    green: 8,
    blue: 8,
    alpha: 0.1,
    name: 'Line Default',
};

export const settings = defineSettings({
    main: [],
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
                    id: 'isSizeCustom',
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
                            id: 'boardAxisLineStyle',
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
                            id: 'boardAxisLineWidth',
                            type: 'input',
                            placeholder: '1px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'boardAxisLineWidth');
                            },
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                        },
                    ],
                    layout: MultiInputLayout.Columns,
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
                                    id: 'boardBorderLineStyle',
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
                                    id: 'boardBorderLineWidth',
                                    type: 'input',
                                    placeholder: '1px',
                                    rules: [numericalOrPixelRule],
                                    onChange: (bundle) => {
                                        appendUnit(bundle, 'boardBorderLineWidth');
                                    },
                                },
                                {
                                    id: 'boardBorderLineColor',
                                    type: 'colorInput',
                                    defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                                },
                            ],
                            layout: MultiInputLayout.Columns,
                        },
                    ],
                },
            ],
        },
    ],
});
