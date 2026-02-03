/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FileExtensionSets,
    Security,
    appendUnit,
    defineSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    getSecurityDownloadableSetting,
    getSecurityGlobalControlSetting,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { DEFAULT_IMAGE_BLOCK_SETTINGS } from './const';
import { aspectRatioFormatRule, aspectRatioNumberRule } from './helpers/ruleValidations';
import {
    Autosizing,
    CaptionPosition,
    HorizontalAlignment,
    ImageAspectRatio,
    Padding,
    Ratio,
    VerticalAlignment,
    imageAspectRatioValues,
    paddingValues,
    radiusValues,
} from './types';

const POSITIONING_ID = 'positioning';
const HAS_BACKGROUND_ID = 'hasBackground';
const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';
const RATIO_CHOICE_ID = 'ratioChoice';
const RATIO_CUSTOM_ID = 'ratioCustom';
export const IMAGE_ID = 'image';
export const ATTACHMENTS_ASSET_ID = 'attachments';
export const ALLOWED_EXTENSIONS = [
    ...FileExtensionSets.Images,
    ...FileExtensionSets.Documents,
    ...FileExtensionSets.Templates,
];

const {
    hasLink,
    hasCustomRatio,
    ratioChoice,
    autosizing,
    alignment,
    horizontalAlignment,
    hasCustomPadding,
    paddingChoice,
    positioning,
    ratio,
    hasBackground,
    backgroundColor,
    borderColor,
    assetViewerEnabled,
} = DEFAULT_IMAGE_BLOCK_SETTINGS;

export const settings = defineSettings({
    basics: [
        {
            id: IMAGE_ID,
            type: 'assetInput',
            label: 'Image',
            size: 'small',
            extensions: ALLOWED_EXTENSIONS,
            showForTranslations: true,
        },
        {
            id: 'hasLink',
            type: 'switch',
            label: 'Link',
            defaultValue: hasLink,
            showForTranslations: true,
            on: [
                {
                    id: 'linkObject',
                    type: 'link',
                    clearable: true,
                    showForTranslations: true,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'layout-image',
            type: 'sectionHeading',
            label: 'Image',
            blocks: [
                {
                    id: 'hasCustomRatio',
                    type: 'switch',
                    defaultValue: hasCustomRatio,
                    switchLabel: 'Custom',
                    label: 'Ratio',
                    info: 'Easily unify your assets across multiple blocks with a set aspect ratio.',
                    onChange: (bundle) =>
                        presetCustomValue(bundle, RATIO_CHOICE_ID, RATIO_CUSTOM_ID, imageAspectRatioValues),
                    on: [
                        {
                            id: RATIO_CUSTOM_ID,
                            type: 'input',
                            rules: [aspectRatioFormatRule, aspectRatioNumberRule],
                            onChange: (bundle) => appendUnit(bundle, RATIO_CUSTOM_ID),
                        },
                    ],
                    off: [
                        {
                            id: RATIO_CHOICE_ID,
                            type: 'segmentedControls',
                            defaultValue: ratioChoice,
                            choices: [
                                { value: ImageAspectRatio.RatioNone, label: 'None' },
                                { value: ImageAspectRatio.Ratio1To1, label: '1:1' },
                                { value: ImageAspectRatio.Ratio4To3, label: '4:3' },
                                { value: ImageAspectRatio.Ratio3To2, label: '3:2' },
                                { value: ImageAspectRatio.Ratio16To9, label: '16:9' },
                            ],
                        },
                    ],
                },
                {
                    id: 'autosizing',
                    type: 'segmentedControls',
                    label: 'Auto sizing',
                    info: 'Choose how the asset scales. None fits it up to its original size, Fit scales it to fit the block size, and Fill crops it to cover all available space.',
                    defaultValue: autosizing,
                    choices: [
                        { value: Autosizing.None, label: 'None' },
                        { value: Autosizing.Fit, label: 'Fit' },
                        { value: Autosizing.Fill, label: 'Fill' },
                    ],
                },
                {
                    id: 'alignmentWrapper',
                    type: 'multiInput',
                    label: 'Alignment',
                    blocks: [
                        {
                            id: 'alignment',
                            type: 'dropdown',
                            defaultValue: alignment,
                            disabled: (bundle) =>
                                bundle.getBlock('useFocalPoint')?.value === true &&
                                bundle.getBlock('autosizing')?.value === Autosizing.Fill,
                            choices: [
                                { value: VerticalAlignment.Left, label: 'Left', icon: 'ArrowAlignLeft' },
                                { value: VerticalAlignment.Center, label: 'Center', icon: 'ArrowAlignVerticalCentre' },
                                { value: VerticalAlignment.Right, label: 'Right', icon: 'ArrowAlignRight' },
                            ],
                        },
                        {
                            id: 'horizontalAlignment',
                            type: 'dropdown',
                            defaultValue: horizontalAlignment,
                            disabled: (bundle) =>
                                bundle.getBlock('useFocalPoint')?.value === true &&
                                bundle.getBlock('autosizing')?.value === Autosizing.Fill,
                            choices: [
                                { value: HorizontalAlignment.Top, label: 'Top', icon: 'ArrowAlignUp' },
                                {
                                    value: HorizontalAlignment.Center,
                                    label: 'Center',
                                    icon: 'ArrowAlignHorizontalCentre',
                                },
                                { value: HorizontalAlignment.Bottom, label: 'Bottom', icon: 'ArrowAlignDown' },
                            ],
                        },
                    ],
                },
                {
                    id: 'useFocalPoint',
                    type: 'switch',
                    label: 'Use focal point',
                    info: 'Aligns your asset around its predefined focal point, if one is available.',
                    show: (bundle) => bundle.getBlock('autosizing')?.value === Autosizing.Fill,
                },
                {
                    id: 'hasCustomPadding',
                    type: 'switch',
                    defaultValue: hasCustomPadding,
                    switchLabel: 'Custom',
                    label: 'Padding',
                    info: 'The spacing around the image.',
                    onChange: (bundle) =>
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_CUSTOM_ID, paddingValues),
                    on: [
                        {
                            id: PADDING_CUSTOM_ID,
                            type: 'input',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle) => appendUnit(bundle, PADDING_CUSTOM_ID),
                        },
                    ],
                    off: [
                        {
                            id: PADDING_CHOICE_ID,
                            type: 'segmentedControls',
                            defaultValue: paddingChoice,
                            choices: [
                                {
                                    value: Padding.None,
                                    label: 'None',
                                },
                                {
                                    value: Padding.Small,
                                    label: 'S',
                                },
                                {
                                    value: Padding.Medium,
                                    label: 'M',
                                },
                                {
                                    value: Padding.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'layout-text',
            type: 'sectionHeading',
            label: 'Text',
            blocks: [
                {
                    id: POSITIONING_ID,
                    label: 'Positioning',
                    info: "Some settings won't apply if the container is too narrow.",
                    type: 'segmentedControls',
                    defaultValue: positioning,
                    choices: [
                        { value: CaptionPosition.Below, icon: 'MediaObjectTextBottom' },
                        { value: CaptionPosition.Above, icon: 'MediaObjectTextTop' },
                        { value: CaptionPosition.Right, icon: 'MediaObjectTextRight' },
                        { value: CaptionPosition.Left, icon: 'MediaObjectTextLeft' },
                    ],
                },
                {
                    id: 'ratio',
                    label: 'Ratio',
                    type: 'segmentedControls',
                    defaultValue: ratio,
                    show: (bundle) =>
                        bundle.getBlock(POSITIONING_ID)?.value === CaptionPosition.Left ||
                        bundle.getBlock(POSITIONING_ID)?.value === CaptionPosition.Right,
                    choices: [
                        { value: Ratio.Ratio2To1, icon: 'MediaObjectRatio2To1' },
                        { value: Ratio.Ratio1To1, icon: 'MediaObjectRatio1To1' },
                        { value: Ratio.Ratio1To2, icon: 'MediaObjectRatio1To2' },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: HAS_BACKGROUND_ID,
            type: 'switch',
            label: 'Background',
            defaultValue: hasBackground,
            on: [
                {
                    id: 'backgroundColor',
                    type: 'colorInput',
                    defaultValue: backgroundColor,
                },
            ],
        },
        getBorderSettings({ defaultColor: borderColor }),
        {
            ...getBorderRadiusSettings({
                id: 'cornerRadius',
                radiusStyleMap: radiusValues,
            }),
            info: 'Adjust how rounded the corners of the image container are.',
            show: (bundle) =>
                Boolean(
                    bundle.getBlock('hasBackground')?.value ||
                    bundle.getBlock('autosizing')?.value === Autosizing.Fill ||
                    (!bundle.getBlock('hasCustomRatio')?.value &&
                        bundle.getBlock('ratioChoice')?.value === ImageAspectRatio.RatioNone)
                ),
        },
    ],
    security: [
        ...getSecurityGlobalControlSetting(),
        {
            id: 'assetViewerEnabled',
            label: 'Asset viewer',
            info: "When disabled, viewers won't be able to open the image in the asset detail view.",
            type: 'switch',
            defaultValue: assetViewerEnabled,
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            show: (bundle) => bundle.getBlock('security')?.value?.toString() === Security.Custom,
        },
        getSecurityDownloadableSetting(),
    ],
});
