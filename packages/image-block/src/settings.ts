/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetInputSize,
    IconEnum,
    NotificationStyleType,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

import { Alignment, CaptionPosition, ImageSecurity, Padding, Ratio, paddingValues, radiusValues } from './types';

const POSITIONING_ID = 'positioning';
const HAS_BACKGROUND_ID = 'hasBackground';
const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';
const SECURITY_ID = 'security';
export const IMAGE_SETTING_ID = 'image';
export const ATTACHMENTS_SETTING_ID = 'attachments';

export const settings = defineSettings({
    basics: [
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: IMAGE_SETTING_ID,
                    type: 'assetInput',
                    label: 'Image',
                    size: AssetInputSize.Small,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
                {
                    id: 'hasLink',
                    type: 'switch',
                    label: 'Link',
                    defaultValue: false,
                    on: [
                        {
                            id: 'linkObject',
                            type: 'linkChooser',
                            placeholder: 'Paste link, or type to search',
                        },
                    ],
                    off: [],
                },
            ],
        },
        {
            id: 'imageResolutionInfo',
            type: 'notification',
            title: 'Image resolution',
            text: 'The correct pixel density (former 2x setting) is now provided automatically based on the device.',
            styles: {
                type: NotificationStyleType.Info,
                icon: true,
            },
            link: {
                label: 'Follow our guide for image resolution',
                href: 'https://help.frontify.com/en/articles/4889509-what-is-the-correct-pixel-density-for-my-image',
                target: '_blank',
            },
        },
    ],
    layout: [
        {
            id: POSITIONING_ID,
            label: 'Positioning',
            type: 'slider',
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
            type: 'slider',
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
            type: 'slider',
            label: 'Alignment',
            info: 'For images that are smaller than the width of the Content Block.',
            defaultValue: Alignment.Left,
            choices: [
                {
                    value: Alignment.Left,
                    icon: IconEnum.ArrowAlignLeft,
                    label: 'Left',
                },
                {
                    value: Alignment.Center,
                    icon: IconEnum.ArrowAlignVerticalCentre,
                    label: 'Center',
                },
                {
                    value: Alignment.Right,
                    icon: IconEnum.ArrowAlignRight,
                    label: 'Right',
                },
            ],
        },
        {
            id: 'hasCustomPadding',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Image padding',
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
                    type: 'slider',
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
        {
            id: SECURITY_ID,
            type: 'slider',
            defaultValue: ImageSecurity.Global,
            helperText: 'Change global settings here.',
            choices: [
                {
                    value: ImageSecurity.Global,
                    label: 'Global Settings',
                },
                {
                    value: ImageSecurity.Custom,
                    label: 'Custom',
                },
            ],
        },
        {
            id: 'downloadable',
            type: 'switch',
            defaultValue: false,
            label: 'Downloadable',
            show: (bundle) => bundle.getBlock(SECURITY_ID)?.value === ImageSecurity.Custom,
        },
    ],
});
