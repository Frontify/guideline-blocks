/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FileExtensionSets,
    IconEnum,
    Security,
    appendUnit,
    defineSettings,
    getSecurityDownloadableSetting,
    getSecurityGlobalControlSetting,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { Alignment, CaptionPosition, Padding, paddingValues } from './types';

const POSITIONING_ID = 'positioning';
const HAS_BACKGROUND_ID = 'hasBackground';
const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_CUSTOM_ID = 'paddingCustom';
export const IMAGE_ID = 'image';
export const LOTTIE_URL_ID = 'lottieUrl';
export const ATTACHMENTS_ASSET_ID = 'attachments';
export const ALLOWED_EXTENSIONS = [
    ...FileExtensionSets.Images,
    ...FileExtensionSets.Documents,
    ...FileExtensionSets.Templates,
    ...FileExtensionSets.Audio,
    'json',
];

export const LOTTIE_ID = 'lottie';

export const settings = defineSettings({
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
            id: 'alignment',
            type: 'segmentedControls',
            label: 'Alignment',
            info: 'For images that are smaller than the width of the Content Block.',
            defaultValue: Alignment.Center,
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
    playback: [
        //     {
        //         id: 'playback',
        //         type: 'checklist',
        //         label: 'Animation Plays:',
        //         defaultValue: ['autoplay'],
        //         choices: [
        //             {
        //                 id: 'autoplay',
        //                 value: 'autoplay',
        //                 label: 'Autoplay',
        //             },
        //             {
        //                 id: 'hover',
        //                 value: 'hover',
        //                 label: 'On hover',
        //             },
        //         ],
        //     },
        {
            id: 'autoplay',
            type: 'switch',
            label: 'Autoplay',
            defaultValue: true,
        },
        {
            id: 'hover',
            type: 'switch',
            label: 'Play on hover',
            defaultValue: true,
        },
        {
            id: 'resize',
            type: 'switch',
            label: 'Auto Resize',
            defaultValue: true,
        },
        {
            id: 'loop',
            type: 'switch',
            label: 'Loop',
            defaultValue: true,
        },
        {
            id: 'frameInterpolation',
            type: 'switch',
            label: 'Frame interpolation',
            defaultValue: true,
        },
        {
            id: 'speed',
            type: 'segmentedControls',
            label: 'Speed',
            defaultValue: '0.5',
            choices: [
                {
                    value: 0.5,
                    label: '0.5x',
                },
                {
                    value: 1.0,
                    label: '1x',
                },
                {
                    value: 1.5,
                    label: '1.5x',
                },
                {
                    value: 2.0,
                    label: '2x',
                },
                {
                    value: 2.5,
                    label: '2.5x',
                },
            ],
        },
        {
            id: 'mode',
            type: 'dropdown',
            label: 'Mode',
            defaultValue: 'forward',
            choices: [
                {
                    value: 'forward',
                    label: 'Forward',
                },
                {
                    value: 'reverse',
                    label: 'Reverse',
                },
                {
                    value: 'bounce',
                    label: 'Bounce',
                },
                {
                    value: 'reverse_bounce',
                    label: 'Reverse Bounce',
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
        // getBorderSettings(),
        // getBorderRadiusSettings({
        //     id: 'cornerRadius',
        //     radiusStyleMap: radiusValues,
        // }),
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
