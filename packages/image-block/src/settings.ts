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
import { Alignment, CaptionPosition, Padding, Ratio, paddingValues, radiusValues } from './types';

const POSITIONING_ID = 'positioning';
const HAS_BACKGROUND_ID = 'hasBackground';
const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';
export const IMAGE_ID = 'image';
export const ATTACHMENTS_ASSET_ID = 'attachments';
export const ALLOWED_EXTENSIONS = [
    ...FileExtensionSets.Images,
    ...FileExtensionSets.Documents,
    ...FileExtensionSets.Templates,
];

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
            id: POSITIONING_ID,
            label: 'Positioning',
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
            id: 'alignment',
            type: 'segmentedControls',
            label: 'Alignment',
            info: 'For images that are smaller than the width of the Content Block.',
            defaultValue: Alignment.Left,
            choices: [
                {
                    value: Alignment.Left,
                    icon: IconEnum.ArrowAlignLeft,
                },
                {
                    value: Alignment.Center,
                    icon: IconEnum.ArrowAlignVerticalCentre,
                },
                {
                    value: Alignment.Right,
                    icon: IconEnum.ArrowAlignRight,
                },
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
                    defaultValue: { red: 255, green: 255, blue: 255 },
                },
            ],
        },
        getBorderSettings(),
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
