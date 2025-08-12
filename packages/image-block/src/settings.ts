/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FileExtensionSets,
    IconEnum,
    NotificationBlockDividerPosition,
    NotificationStyleType,
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
import { aspectRatioFormatRule, aspectRatioNumberRule } from './helpers/ruleValidations';

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

export const DEFAULT_BACKGROUND_COLOR = { red: 255, green: 255, blue: 255 };
export const DEFAULT_BORDER_COLOR = {
    red: 234,
    green: 235,
    blue: 235,
    alpha: 1,
};

export const settings = defineSettings({
    basics: [
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: IMAGE_ID,
                    type: 'assetInput',
                    label: 'Image',
                    size: 'small',
                    extensions: ALLOWED_EXTENSIONS,
                },
                {
                    id: 'hasLink',
                    type: 'switch',
                    label: 'Link',
                    defaultValue: false,
                    on: [
                        {
                            id: 'linkObject',
                            type: 'link',
                            clearable: true,
                        },
                    ],
                },
            ],
            showForTranslations: true,
        },
        {
            id: 'imageResolutionInfo',
            type: 'notification',
            title: 'Image resolution',
            text: 'The correct pixel density (former 2x setting) is now provided automatically based on the device.',
            styles: {
                type: NotificationStyleType.Info,
                icon: true,
                divider: NotificationBlockDividerPosition.Top,
            },
            footer: {
                label: 'Follow our guide for image resolution',
                href: 'https://help.frontify.com/en/articles/4796048-image-resolutions',
                target: '_blank',
            },
        },
    ],
    layout: [
        {
            id: 'hasCustomRatio',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Ratio',
            info: 'Easily unify your assets across multiple blocks with a set aspect ratio.',
            onChange: (bundle) => presetCustomValue(bundle, RATIO_CHOICE_ID, RATIO_CUSTOM_ID, imageAspectRatioValues),
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
                    defaultValue: ImageAspectRatio.RatioNone,
                    choices: [
                        { value: ImageAspectRatio.RatioNone, label: 'None' },
                        { value: ImageAspectRatio.Ratio1To1, label: '1:1' },
                        { value: ImageAspectRatio.Ratio3To2, label: '3:2' },
                        { value: ImageAspectRatio.Ratio4To3, label: '4:3' },
                        { value: ImageAspectRatio.Ratio16To9, label: '16:9' },
                    ],
                },
            ],
        },
        {
            id: 'autosizing',
            type: 'segmentedControls',
            label: 'Auto sizing',
            info: 'Choose how the asset scales and aligns. None fits it up to its original size, Fit scales it to fit the block size, and Fill crops it to cover all available space.',
            defaultValue: Autosizing.None,
            choices: [
                { value: Autosizing.None, label: 'None' },
                { value: Autosizing.Fit, label: 'Fit' },
                { value: Autosizing.Fill, label: 'Fill' },
            ],
        },
        {
            id: 'alignmentWrapper',
            type: 'multiInput',
            blocks: [
                {
                    id: 'alignment',
                    type: 'dropdown',
                    defaultValue: 'center',
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
                    defaultValue: 'center',
                    disabled: (bundle) =>
                        bundle.getBlock('useFocalPoint')?.value === true &&
                        bundle.getBlock('autosizing')?.value === Autosizing.Fill,
                    choices: [
                        { value: HorizontalAlignment.Top, label: 'Top', icon: 'ArrowAlignUp' },
                        { value: HorizontalAlignment.Center, label: 'Center', icon: 'ArrowAlignHorizontalCentre' },
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
            id: POSITIONING_ID,
            label: 'Positioning',
            info: "Some settings won't apply if the container is too narrow.",
            type: 'segmentedControls',
            defaultValue: CaptionPosition.Below,
            choices: [
                { value: CaptionPosition.Below, icon: IconEnum.MediaObjectTextBottom },
                { value: CaptionPosition.Above, icon: IconEnum.MediaObjectTextTop },
                { value: CaptionPosition.Right, icon: IconEnum.MediaObjectTextRight },
                { value: CaptionPosition.Left, icon: IconEnum.MediaObjectTextLeft },
            ],
        },
        {
            id: 'ratio',
            label: 'Ratio',
            type: 'segmentedControls',
            defaultValue: Ratio.Ratio2To1,
            show: (bundle) =>
                bundle.getBlock(POSITIONING_ID)?.value === CaptionPosition.Left ||
                bundle.getBlock(POSITIONING_ID)?.value === CaptionPosition.Right,
            choices: [
                { value: Ratio.Ratio2To1, icon: IconEnum.MediaObjectRatio2To1 },
                { value: Ratio.Ratio1To1, icon: IconEnum.MediaObjectRatio1To1 },
                { value: Ratio.Ratio1To2, icon: IconEnum.MediaObjectRatio1To2 },
            ],
        },
        {
            id: 'hasCustomPadding',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Padding',
            info: 'The spacing around the image.',
            onChange: (bundle) => presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_CUSTOM_ID, paddingValues),
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
                    defaultValue: Padding.None,
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
    style: [
        {
            id: HAS_BACKGROUND_ID,
            type: 'switch',
            label: 'Background',
            defaultValue: false,
            on: [
                {
                    id: 'backgroundColor',
                    type: 'colorInput',
                    defaultValue: DEFAULT_BACKGROUND_COLOR,
                },
            ],
        },
        getBorderSettings({ defaultColor: DEFAULT_BORDER_COLOR }),
        getBorderRadiusSettings({
            id: 'cornerRadius',
            radiusStyleMap: radiusValues,
        }),
    ],
    security: [
        ...getSecurityGlobalControlSetting(),
        {
            id: 'assetViewerEnabled',
            label: 'Asset viewer',
            info: "When disabled, viewers won't be able to open the image in the asset detail view.",
            type: 'switch',
            defaultValue: true,
            show: (bundle) => bundle.getBlock('security')?.value?.toString() === Security.Custom,
        },
        getSecurityDownloadableSetting(),
    ],
});
