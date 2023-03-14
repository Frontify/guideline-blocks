/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetInputSize,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    minimumNumericRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { BorderStyle, getBorderRadiusSettings, getBorderSettings } from '../../shared';
import { Alignment, Handle, Height, InheritSettings, LabelPlacement, heightMapWithPixel } from './types';
import { FileExtensionSets } from '@frontify/app-bridge';

export const settings = defineSettings({
    main: [
        {
            id: 'alignment',
            type: 'dropdown',
            size: DropdownSize.Large,
            defaultValue: Alignment.Horizontal,
            choices: [
                {
                    value: Alignment.Horizontal,
                    label: 'Left / Right',
                },
                {
                    value: Alignment.Vertical,
                    label: 'Top / Bottom',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'firstAssetSection',
            type: 'sectionHeading',
            label: 'First Image',
            blocks: [
                {
                    id: 'firstAsset',
                    type: 'assetInput',
                    label: '',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    extensions: FileExtensionSets['Images'],
                },
                {
                    id: 'firstAssetHasStrikethrough',
                    type: 'switch',
                    label: 'Strikethrough line',

                    defaultValue: false,
                },
            ],
        },
        {
            id: 'secondAssetSection',
            type: 'sectionHeading',
            label: 'Second Image',
            blocks: [
                {
                    id: 'secondAsset',
                    type: 'assetInput',
                    label: 'Second Image',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    extensions: FileExtensionSets['Images'],
                },
                {
                    id: 'secondAssetHasStrikethrough',
                    type: 'switch',
                    label: 'Strikethrough line',
                    defaultValue: false,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'contentBlockSection',
            type: 'sectionHeading',
            label: 'Content block',
            blocks: [
                {
                    id: 'hasCustomHeight',
                    label: 'Height',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => presetCustomValue(bundle, 'height', 'customHeight', heightMapWithPixel),
                    on: [
                        {
                            id: 'customHeight',
                            type: 'input',
                            placeholder: 'e.g. 500px',
                            rules: [numericalOrPixelRule, minimumNumericRule(100)],
                            onChange: (bundle) => appendUnit(bundle, 'customHeight'),
                        },
                    ],
                    off: [
                        {
                            id: 'height',
                            type: 'slider',
                            defaultValue: 'auto',
                            choices: [
                                {
                                    value: Height.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: Height.Small,
                                    label: 'S',
                                },
                                {
                                    value: Height.Medium,
                                    label: 'M',
                                },
                                {
                                    value: Height.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'leftImageSectionHorizontal',
            type: 'sectionHeading',
            label: 'First image',
            show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Horizontal,
            blocks: [
                {
                    id: 'firstAssetLabelPlacement_horizontal',
                    type: 'slider',
                    label: 'Label position',
                    defaultValue: LabelPlacement.Top,
                    choices: [
                        {
                            value: LabelPlacement.Top,
                            icon: IconEnum.ArrowAlignUp,
                        },
                        {
                            value: LabelPlacement.Center,
                            icon: IconEnum.ArrowAlignHorizontalCentre,
                        },
                        {
                            value: LabelPlacement.Bottom,
                            icon: IconEnum.ArrowAlignDown,
                        },
                    ],
                },
            ],
        },
        {
            id: 'leftImageSectionVertical',
            type: 'sectionHeading',
            label: 'First image',
            show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Vertical,
            blocks: [
                {
                    id: 'firstAssetLabelPlacement_vertical',
                    type: 'slider',
                    label: 'Label position',
                    defaultValue: LabelPlacement.Left,
                    choices: [
                        {
                            value: LabelPlacement.Left,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: LabelPlacement.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: LabelPlacement.Right,
                            icon: IconEnum.ArrowAlignRight,
                        },
                    ],
                },
            ],
        },
        {
            id: 'rightImageSectionHorizontal',
            type: 'sectionHeading',
            label: 'Second image',
            show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Horizontal,
            blocks: [
                {
                    id: 'secondAssetLabelPlacement_horizontal',
                    type: 'slider',
                    show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Horizontal,
                    defaultValue: LabelPlacement.Top,
                    label: 'Label position',
                    choices: [
                        {
                            value: LabelPlacement.Top,
                            icon: IconEnum.ArrowAlignUp,
                        },
                        {
                            value: LabelPlacement.Center,
                            icon: IconEnum.ArrowAlignHorizontalCentre,
                        },
                        {
                            value: LabelPlacement.Bottom,
                            icon: IconEnum.ArrowAlignDown,
                        },
                    ],
                },
            ],
        },
        {
            id: 'rightImageSectionVertical',
            type: 'sectionHeading',
            label: 'Second image',
            show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Vertical,
            blocks: [
                {
                    id: 'secondAssetLabelPlacement_vertical',
                    type: 'slider',
                    defaultValue: LabelPlacement.Left,
                    label: 'Label position',
                    show: (bundle) => bundle.getBlock('alignment')?.value === Alignment.Vertical,
                    choices: [
                        {
                            value: LabelPlacement.Left,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: LabelPlacement.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: LabelPlacement.Right,
                            icon: IconEnum.ArrowAlignRight,
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'controlsSection',
            type: 'sectionHeading',
            label: 'Controls',
            blocks: [
                {
                    id: 'handle',
                    type: 'slider',
                    label: 'Handles',
                    defaultValue: Handle.Arrows,
                    choices: [
                        {
                            value: Handle.Arrows,
                            label: 'Arrows',
                        },
                        {
                            value: Handle.Circles,
                            label: 'Circles',
                        },
                        {
                            value: Handle.None,
                            label: 'None',
                        },
                    ],
                },
                {
                    id: 'sliderStyleSection',
                    type: 'multiInput',
                    lastItemFullWidth: true,
                    label: 'Line',
                    onChange: (bundle) => appendUnit(bundle, 'sliderWidth'),
                    layout: MultiInputLayout.Columns,
                    blocks: [
                        {
                            id: 'sliderStyle',
                            type: 'dropdown',
                            defaultValue: BorderStyle.Solid,
                            choices: [
                                {
                                    value: BorderStyle.Solid,
                                    label: BorderStyle.Solid,
                                },
                                {
                                    value: BorderStyle.Dotted,
                                    label: BorderStyle.Dotted,
                                },
                                {
                                    value: BorderStyle.Dashed,
                                    label: BorderStyle.Dashed,
                                },
                            ],
                        },
                        {
                            id: 'sliderWidth',
                            type: 'input',
                            defaultValue: '1px',
                            rules: [numericalOrPixelRule, maximumNumericalOrPixelOrAutoRule(500)],
                            placeholder: 'e.g. 1px',
                        },
                        {
                            id: 'sliderColor',
                            type: 'colorInput',
                            defaultValue: {
                                red: 0,
                                green: 0,
                                blue: 0,
                                alpha: 1,
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 'blockSection',
            type: 'sectionHeading',
            label: 'Block',
            blocks: [
                {
                    id: 'hasBackground',
                    type: 'switch',
                    label: 'Background',
                    on: [
                        {
                            id: 'backgroundColor',
                            type: 'colorInput',
                            defaultValue: {
                                red: 0,
                                green: 0,
                                blue: 0,
                                alpha: 1,
                            },
                        },
                    ],
                },
                getBorderSettings(),
                getBorderRadiusSettings(),
            ],
        },
        {
            id: 'strikethroughSection',
            type: 'sectionHeading',
            label: 'Strikethrough line',
            show: (bundle) =>
                !!bundle.getBlock('firstAssetHasStrikethrough')?.value ||
                !!bundle.getBlock('secondAssetHasStrikethrough')?.value,
            blocks: [
                {
                    id: 'strikethroughColorSource',
                    type: 'slider',
                    label: 'Color',
                    info: 'The color is defined in the global settings (Accent colors) and you can override it here.',
                    defaultValue: InheritSettings.INHERIT,
                    choices: [
                        {
                            value: InheritSettings.INHERIT,
                            label: 'Inherit settings',
                        },
                        {
                            value: InheritSettings.OVERRIDE,
                            label: 'Override',
                        },
                    ],
                },
                {
                    id: 'customStrikeThroughColor',
                    type: 'colorInput',
                    defaultValue: {
                        red: 255,
                        green: 0,
                        blue: 0,
                        alpha: 1,
                    },
                    show: (bundle) => bundle.getBlock('strikethroughColorSource')?.value === InheritSettings.OVERRIDE,
                },
            ],
        },
    ],
});
