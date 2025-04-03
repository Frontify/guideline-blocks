/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    Radius,
    appendUnit,
    defineSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    numericalOrPixelRule,
    presetCustomValue,
    radiusStyleMap,
} from '@frontify/guideline-blocks-settings';
import {
    BlockMode,
    DoDontImageHeight,
    DoDontSpacing,
    DoDontStyle,
    GUTTER_VALUES,
    IMAGE_HEIGHT_VALUES,
    ImageFitChoice,
    ItemIconChoice,
} from './types';

export const DEFAULT_BACKGROUND_COLOR = { red: 241, green: 241, blue: 241 };
export const DEFAULT_BORDER_COLOR = { red: 234, green: 235, blue: 235, alpha: 1 };

export const settings = defineSettings({
    main: [
        {
            id: 'mode',
            type: 'dropdown',
            size: 'large',
            defaultValue: BlockMode.TEXT,
            choices: [
                {
                    value: BlockMode.TEXT,
                    icon: IconEnum.TextAlignmentLeft20,
                    label: 'Text',
                },
                {
                    value: BlockMode.TEXT_AND_IMAGE,
                    icon: IconEnum.MediaObjectTextBottom20,
                    label: 'Text and Image',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'styleSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: 'style',
                    label: 'Indicator',
                    type: 'segmentedControls',
                    defaultValue: DoDontStyle.Icons,
                    choices: [
                        {
                            value: DoDontStyle.Icons,
                            icon: IconEnum.DoAndDont20,
                        },
                        {
                            value: DoDontStyle.Underline,
                            icon: IconEnum.TextFormatUnderline20,
                        },
                        {
                            value: DoDontStyle.Text,
                            icon: IconEnum.TextAlignmentLeft20,
                        },
                    ],
                },
            ],
        },
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: 'Image',
            show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,
            blocks: [
                {
                    id: 'hasStrikethrough',
                    type: 'switch',
                    defaultValue: true,
                    label: 'Strikethrough line',
                },
            ],
        },
        {
            id: 'iconsSection',
            type: 'sectionHeading',
            label: 'Icons',

            show: (bundle) => bundle.getBlock('style')?.value === DoDontStyle.Icons,
            blocks: [
                {
                    id: 'doIconChoice',
                    type: 'segmentedControls',
                    label: 'Do icon',
                    defaultValue: ItemIconChoice.CHECKMARK_CIRCLE,
                    choices: [
                        {
                            value: ItemIconChoice.CHECKMARK_CIRCLE,
                            icon: IconEnum.CheckMarkCircle20,
                        },
                        {
                            value: ItemIconChoice.CHECKMARK,
                            icon: IconEnum.CheckMark20,
                        },
                    ],
                },
                {
                    id: 'dontIconChoice',
                    type: 'segmentedControls',
                    label: "Don't icon",
                    defaultValue: ItemIconChoice.CROSS_CIRCLE,
                    choices: [
                        {
                            value: ItemIconChoice.CROSS_CIRCLE,
                            icon: IconEnum.CrossCircle20,
                        },
                        {
                            value: ItemIconChoice.CROSS,
                            icon: IconEnum.Cross20,
                        },
                    ],
                },
            ],
        },
    ],
    layout: [
        {
            id: 'itemsSection',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: 'columns',
                    label: 'Columns',
                    type: 'segmentedControls',
                    defaultValue: 2,
                    info: "The number of columns for Dos and Don'ts. Some settings won't apply if the container is too narrow.",
                    choices: [
                        {
                            value: 1,
                            label: '1',
                        },
                        {
                            value: 2,
                            label: '2',
                        },
                        {
                            value: 3,
                            label: '3',
                        },
                        {
                            value: 4,
                            label: '4',
                        },
                    ],
                },
                {
                    id: 'keepSideBySide',
                    label: 'Always show side by side',
                    type: 'switch',
                    show: (bundle) => bundle.getBlock('columns')?.value?.toString() === '2',
                    defaultValue: true,
                },
                {
                    id: 'isCustomColumnGutter',
                    label: 'Column gutter',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    info: "An official nerd's term for 'column gap'",
                    show: (bundle) => bundle.getBlock('columns')?.value !== '1',
                    onChange: (bundle) =>
                        presetCustomValue(bundle, 'columnGutterChoice', 'customColumnGutterValue', GUTTER_VALUES),
                    on: [
                        {
                            id: 'customColumnGutterValue',
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            defaultValue: '20px',
                            placeholder: '20px',
                            onChange: (bundle) => appendUnit(bundle, 'customColumnGutterValue'),
                        },
                    ],
                    off: [
                        {
                            id: 'columnGutterChoice',
                            type: 'segmentedControls',
                            defaultValue: DoDontSpacing.Medium,
                            choices: [
                                {
                                    value: DoDontSpacing.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: DoDontSpacing.Small,
                                    label: 'S',
                                },
                                {
                                    value: DoDontSpacing.Medium,
                                    label: 'M',
                                },
                                {
                                    value: DoDontSpacing.Large,
                                    label: 'L',
                                },
                            ],
                            onChange: (bundle) =>
                                bundle.setBlockValue(
                                    'customColumnGutterValue',
                                    GUTTER_VALUES[bundle.getBlock('columnGutterChoice')?.value as DoDontSpacing]
                                ),
                        },
                    ],
                },
                {
                    id: 'isCustomRowGutter',
                    label: 'Row gutter',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    info: "An official nerd's term for 'row gap'",
                    onChange: (bundle) =>
                        presetCustomValue(bundle, 'rowGutterChoice', 'customRowGutterValue', GUTTER_VALUES),
                    on: [
                        {
                            id: 'customRowGutterValue',
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            defaultValue: '20px',
                            placeholder: '20px',
                            onChange: (bundle) => appendUnit(bundle, 'customRowGutterValue'),
                        },
                    ],
                    off: [
                        {
                            id: 'rowGutterChoice',
                            type: 'segmentedControls',
                            defaultValue: DoDontSpacing.Medium,
                            choices: [
                                {
                                    value: DoDontSpacing.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: DoDontSpacing.Small,
                                    label: 'S',
                                },
                                {
                                    value: DoDontSpacing.Medium,
                                    label: 'M',
                                },
                                {
                                    value: DoDontSpacing.Large,
                                    label: 'L',
                                },
                            ],
                            onChange: (bundle) =>
                                bundle.setBlockValue(
                                    'customRowGutterValue',
                                    GUTTER_VALUES[bundle.getBlock('rowGutterChoice')?.value as DoDontSpacing]
                                ),
                        },
                    ],
                },
            ],
        },
        {
            id: 'imagesSection',
            type: 'sectionHeading',
            label: 'Images',
            show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,
            blocks: [
                {
                    id: 'isCustomImageHeight',
                    label: 'Image height',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,
                    on: [
                        {
                            id: 'customImageHeightValue',
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            defaultValue: '60px',
                            placeholder: '60px',
                            onChange: (bundle) => appendUnit(bundle, 'customImageHeightValue'),
                        },
                    ],
                    off: [
                        {
                            id: 'imageHeightChoice',
                            type: 'segmentedControls',
                            defaultValue: DoDontImageHeight.Medium,
                            choices: [
                                {
                                    value: DoDontImageHeight.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: DoDontImageHeight.Small,
                                    label: 'S',
                                },
                                {
                                    value: DoDontImageHeight.Medium,
                                    label: 'M',
                                },
                                {
                                    value: DoDontImageHeight.Large,
                                    label: 'L',
                                },
                            ],
                            onChange: (bundle) =>
                                bundle.setBlockValue(
                                    'customImageHeightValue',
                                    IMAGE_HEIGHT_VALUES[
                                        bundle.getBlock('imageHeightChoice')?.value as DoDontImageHeight
                                    ]
                                ),
                        },
                    ],
                },
                {
                    id: 'imageDisplay',
                    type: 'segmentedControls',
                    defaultValue: ImageFitChoice.FILL,
                    choices: [
                        {
                            value: ImageFitChoice.FILL,
                            label: 'Fill',
                        },
                        {
                            value: ImageFitChoice.FIT,
                            label: 'Fit',
                        },
                    ],
                    show: (bundle) =>
                        bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE &&
                        (bundle.getBlock('imageHeightChoice')?.value !== DoDontImageHeight.Auto ||
                            !!bundle.getBlock('isCustomImageHeight')?.value),
                },
            ],
        },
    ],
    style: [
        {
            id: 'styleItemsSection',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: 'hasCustomDoColor',
                    type: 'switch',
                    defaultValue: false,
                    label: 'Custom Do Color',
                    on: [
                        {
                            id: 'doColor',
                            type: 'colorInput',
                        },
                    ],
                },
                {
                    id: 'hasCustomDontColor',
                    type: 'switch',
                    defaultValue: false,
                    label: "Custom Don't Color",
                    on: [
                        {
                            id: 'dontColor',
                            type: 'colorInput',
                        },
                    ],
                },
            ],
        },
        {
            id: 'styleImagesSection',
            type: 'sectionHeading',
            label: 'Image',
            show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,
            blocks: [
                {
                    id: 'hasBackground',
                    type: 'switch',
                    label: 'Background',
                    defaultValue: true,
                    on: [
                        {
                            id: 'backgroundColor',
                            type: 'colorInput',
                            defaultValue: DEFAULT_BACKGROUND_COLOR,
                        },
                    ],
                    show: (bundle) =>
                        bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE &&
                        !(
                            bundle.getBlock('imageHeightChoice')?.value === DoDontImageHeight.Auto &&
                            !bundle.getBlock('isCustomImageHeight')?.value
                        ) &&
                        bundle.getBlock('imageDisplay')?.value === ImageFitChoice.FIT,
                },
                {
                    ...getBorderSettings({
                        defaultColor: DEFAULT_BORDER_COLOR,
                    }),
                    show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,
                },
                {
                    ...getBorderRadiusSettings(),
                    show: (bundle) => bundle.getBlock('mode')?.value === BlockMode.TEXT_AND_IMAGE,

                    onChange: (bundle) =>
                        bundle.setBlockValue(
                            'radiusValue',
                            radiusStyleMap[bundle.getBlock('radiusChoice')?.value as Radius]
                        ),
                },
            ],
        },
    ],
});
