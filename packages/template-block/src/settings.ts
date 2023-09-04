/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import { Color, DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import type { Bundle } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import {
    AnchoringType,
    BorderStyleType,
    CardPaddingType,
    CornerRadiusType,
    PreviewDisplayType,
    PreviewHeightType,
    PreviewType,
    TextPositioningType,
    TextRatioType,
    cardPaddingValues,
    cornerRadiusValues,
    previewHeightValues,
} from './types';
import { SETTING_ID } from './constants';
import { defineSettings } from '@frontify/guideline-blocks-settings';

const BACKGROUND_COLOR_DEFAULT_VALUE: Color = { red: 250, green: 250, blue: 250, alpha: 1, name: 'Background Default' };
const BORDER_COLOR_DEFAULT_VALUE: Color = { red: 8, green: 8, blue: 8, alpha: 0.1, name: 'Border Default' };

export const settings = defineSettings({
    main: [],
    basics: [
        {
            id: SETTING_ID,
            type: 'templateInput',
            label: 'Template',
        },
        {
            id: 'preview',
            type: 'slider',
            label: 'Preview',
            choices: [
                {
                    label: 'Template',
                    value: PreviewType.Template,
                },
                {
                    label: 'Custom',
                    value: PreviewType.Custom,
                },
                {
                    label: 'None',
                    value: PreviewType.None,
                },
            ],
            defaultValue: PreviewType.Template,
        },
        {
            id: 'previewCustom',
            type: 'assetInput',
            extensions: FileExtensionSets.Images,
            label: 'Custom Preview',
            show: (bundle: Bundle) => bundle.getBlock('preview')?.value === PreviewType.Custom,
        },
    ],
    layout: [
        {
            id: 'cardLayoutHeading',
            type: 'sectionHeading',
            label: 'Card',
            blocks: [
                {
                    id: 'isCardPaddingCustom',
                    type: 'switch',
                    label: 'Padding',
                    switchLabel: 'Custom',
                    info: 'Determines the card padding.',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'cardPaddingSimple', 'cardPaddingCustomTop', cardPaddingValues);
                        presetCustomValue(bundle, 'cardPaddingSimple', 'cardPaddingCustomLeft', cardPaddingValues);
                        presetCustomValue(bundle, 'cardPaddingSimple', 'cardPaddingCustomRight', cardPaddingValues);
                        presetCustomValue(bundle, 'cardPaddingSimple', 'cardPaddingCustomBottom', cardPaddingValues);
                    },
                    on: [
                        {
                            id: 'cardPaddingCustom',
                            type: 'multiInput',
                            layout: 'Spider' as MultiInputLayout.Spider,
                            blocks: [
                                {
                                    id: 'cardPaddingCustomTop',
                                    type: 'input',
                                    label: 'Top',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, 'cardPaddingCustomTop'),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: 'cardPaddingCustomLeft',
                                    type: 'input',
                                    label: 'Left',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, 'cardPaddingCustomLeft'),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: 'cardPaddingCustomRight',
                                    type: 'input',
                                    label: 'Right',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, 'cardPaddingCustomRight'),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: 'cardPaddingCustomBottom',
                                    type: 'input',
                                    label: 'Bottom',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, 'cardPaddingCustomBottom'),
                                    rules: [numericalOrPixelRule],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: 'cardPaddingSimple',
                            type: 'slider',
                            defaultValue: 'small',
                            choices: [
                                {
                                    value: CardPaddingType.Small,
                                    label: 'S',
                                },
                                {
                                    value: CardPaddingType.Medium,
                                    label: 'M',
                                },
                                {
                                    value: CardPaddingType.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'textLayoutHeading',
            type: 'sectionHeading',
            label: 'Text',
            blocks: [
                {
                    id: 'textPositioning',
                    label: 'Positioning',
                    type: 'slider',
                    defaultValue: TextPositioningType.Right,
                    info: 'Where the UI elements are in relation to one another',
                    choices: [
                        {
                            value: TextPositioningType.Bottom,
                            icon: 'MediaObjectTextBottom' as IconEnum.MediaObjectTextBottom,
                        },
                        {
                            value: TextPositioningType.Top,
                            icon: 'MediaObjectTextTop' as IconEnum.MediaObjectTextTop,
                        },
                        {
                            value: TextPositioningType.Right,
                            icon: 'MediaObjectTextRight' as IconEnum.MediaObjectTextRight,
                        },
                        {
                            value: TextPositioningType.Left,
                            icon: 'MediaObjectTextLeft' as IconEnum.MediaObjectTextLeft,
                        },
                    ],
                },
                {
                    id: 'textRatio',
                    label: 'Ratio',
                    type: 'slider',
                    defaultValue: TextRatioType.OneHalf,
                    info: 'The text to image width ratio.',
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Right ||
                            textPositioning === TextPositioningType.Left
                        );
                    },
                    choices: [
                        {
                            value: TextRatioType.OneQuarter,
                            icon: 'MediaObjectRatio3To1' as IconEnum.MediaObjectRatio3To1,
                        },
                        {
                            value: TextRatioType.OneThird,
                            icon: 'MediaObjectRatio2To1' as IconEnum.MediaObjectRatio2To1,
                        },
                        {
                            value: TextRatioType.OneHalf,
                            icon: 'MediaObjectRatio1To1' as IconEnum.MediaObjectRatio1To1,
                        },
                        {
                            value: TextRatioType.TwoThirds,
                            icon: 'MediaObjectRatio1To2' as IconEnum.MediaObjectRatio1To2,
                        },
                        {
                            value: TextRatioType.ThreeQuarters,
                            icon: 'MediaObjectRatio1To3' as IconEnum.MediaObjectRatio1To3,
                        },
                    ],
                },
                {
                    id: 'textAnchoringHorizontal',
                    type: 'slider',
                    label: 'Text anchoring',
                    defaultValue: AnchoringType.Start,
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Right ||
                            textPositioning === TextPositioningType.Left
                        );
                    },
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignUp,
                            label: 'Top',
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignHorizontalCentre,
                            label: 'Middle',
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignDown,
                            label: 'Bottom',
                        },
                    ],
                },
                {
                    id: 'textAnchoringVertical',
                    type: 'slider',
                    label: 'Text anchoring',
                    defaultValue: AnchoringType.Start,
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Top ||
                            textPositioning === TextPositioningType.Bottom
                        );
                    },
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignLeft,
                            label: 'Left',
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                            label: 'Center',
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignRight,
                            label: 'Right',
                        },
                    ],
                },
            ],
        },
        {
            id: 'previewLayoutHeading',
            type: 'sectionHeading',
            label: 'Preview',
            blocks: [
                {
                    id: 'isPreviewHeightCustom',
                    type: 'switch',
                    label: 'Height',
                    switchLabel: 'Custom',
                    info: 'Determines the preview height.',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'previewHeightSimple', 'previewHeightCustom', previewHeightValues);
                    },
                    on: [
                        {
                            id: 'previewHeightCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            clearable: true,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'previewHeightCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'previewHeightSimple',
                            type: 'slider',
                            defaultValue: PreviewHeightType.Small,
                            choices: [
                                {
                                    value: PreviewHeightType.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: PreviewHeightType.Small,
                                    label: 'S',
                                },
                                {
                                    value: PreviewHeightType.Medium,
                                    label: 'M',
                                },
                                {
                                    value: PreviewHeightType.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'previewDisplay',
                    type: 'slider',
                    label: 'Display',
                    defaultValue: PreviewDisplayType.Fit,
                    choices: [
                        {
                            value: PreviewDisplayType.Fit,
                            label: 'Fit',
                        },
                        {
                            value: PreviewDisplayType.Fill,
                            label: 'Fill',
                        },
                    ],
                },
                {
                    id: 'previewImageAnchoring',
                    type: 'slider',
                    label: 'Image anchoring',
                    defaultValue: AnchoringType.Center,
                    show: (bundle: Bundle) => bundle.getBlock('previewDisplay')?.value === PreviewDisplayType.Fit,
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignLeft,
                            label: 'Left',
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                            label: 'Center',
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignRight,
                            label: 'Right',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'cardStyleHeading',
            type: 'sectionHeading',
            label: 'Card',
            blocks: [
                {
                    id: 'hasCardBackgroundColor',
                    label: 'Background',
                    type: 'switch',
                    defaultValue: false,
                    on: [
                        {
                            id: 'cardBackgroundColor',
                            type: 'colorInput',
                            defaultValue: BACKGROUND_COLOR_DEFAULT_VALUE,
                        },
                    ],
                    off: [],
                },
                {
                    id: 'hasCardBorder',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Border',
                    on: [
                        {
                            id: 'border',
                            type: 'multiInput',
                            lastItemFullWidth: true,
                            onChange: (bundle) => {
                                appendUnit(bundle, 'cardBorderWidth');
                            },
                            blocks: [
                                {
                                    id: 'cardBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    size: DropdownSize.Small,
                                    choices: [
                                        {
                                            value: BorderStyleType.Dotted,
                                            label: 'Dotted',
                                        },
                                        {
                                            value: BorderStyleType.Dashed,
                                            label: 'Dashed',
                                        },
                                        {
                                            value: BorderStyleType.Solid,
                                            label: 'Solid',
                                        },
                                    ],
                                },
                                {
                                    id: 'cardBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    placeholder: 'e.g. 2px',
                                    rules: [numericalOrPixelRule],
                                    clearable: false,
                                },
                                {
                                    id: 'cardBorderColor',
                                    type: 'colorInput',
                                    defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                                },
                            ],
                            layout: MultiInputLayout.Columns,
                        },
                    ],
                },
                {
                    id: 'isCardCornerRadiusCustom',
                    type: 'switch',
                    label: 'Corner radius',
                    switchLabel: 'Custom',
                    info: 'Determines the card corner radius.',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(
                            bundle,
                            'cardCornerRadiusSimple',
                            'cardCornerRadiusCustom',
                            cornerRadiusValues
                        );
                    },
                    on: [
                        {
                            id: 'cardCornerRadiusCustom',
                            type: 'input',
                            placeholder: 'e.g. 2px',
                            clearable: true,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'cardCornerRadiusCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'cardCornerRadiusSimple',
                            type: 'slider',
                            defaultValue: CornerRadiusType.Medium,
                            choices: [
                                {
                                    value: CornerRadiusType.None,
                                    label: 'None',
                                },
                                {
                                    value: CornerRadiusType.Small,
                                    label: 'S',
                                },
                                {
                                    value: CornerRadiusType.Medium,
                                    label: 'M',
                                },
                                {
                                    value: CornerRadiusType.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'previewStyleHeading',
            type: 'sectionHeading',
            label: 'Preview',
            blocks: [
                {
                    id: 'hasPreviewBackgroundColor',
                    label: 'Background',
                    type: 'switch',
                    defaultValue: true,
                    on: [
                        {
                            id: 'previewBackgroundColor',
                            type: 'colorInput',
                            defaultValue: BACKGROUND_COLOR_DEFAULT_VALUE,
                        },
                    ],
                    off: [],
                },
                {
                    id: 'hasPreviewBorder',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Border',
                    on: [
                        {
                            id: 'border',
                            type: 'multiInput',
                            lastItemFullWidth: true,
                            onChange: (bundle) => {
                                appendUnit(bundle, 'previewBorderWidth');
                            },
                            blocks: [
                                {
                                    id: 'previewBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    size: DropdownSize.Small,
                                    choices: [
                                        {
                                            value: BorderStyleType.Dotted,
                                            label: 'Dotted',
                                        },
                                        {
                                            value: BorderStyleType.Dashed,
                                            label: 'Dashed',
                                        },
                                        {
                                            value: BorderStyleType.Solid,
                                            label: 'Solid',
                                        },
                                    ],
                                },
                                {
                                    id: 'previewBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    placeholder: 'e.g. 2px',
                                    rules: [numericalOrPixelRule],
                                    clearable: false,
                                },
                                {
                                    id: 'previewBorderColor',
                                    type: 'colorInput',
                                    defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                                },
                            ],
                            layout: MultiInputLayout.Columns,
                        },
                    ],
                },
                {
                    id: 'isPreviewCornerRadiusCustom',
                    type: 'switch',
                    label: 'Corner radius',
                    switchLabel: 'Custom',
                    info: 'Determines the preview corner radius.',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(
                            bundle,
                            'previewCornerRadiusSimple',
                            'previewCornerRadiusCustom',
                            cornerRadiusValues
                        );
                    },
                    on: [
                        {
                            id: 'previewCornerRadiusCustom',
                            type: 'input',
                            placeholder: 'e.g. 2px',
                            clearable: true,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'previewCornerRadiusCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'previewCornerRadiusSimple',
                            type: 'slider',
                            defaultValue: CornerRadiusType.Medium,
                            choices: [
                                {
                                    value: CornerRadiusType.None,
                                    label: 'None',
                                },
                                {
                                    value: CornerRadiusType.Small,
                                    label: 'S',
                                },
                                {
                                    value: CornerRadiusType.Medium,
                                    label: 'M',
                                },
                                {
                                    value: CornerRadiusType.Large,
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
