/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetInputSize,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    NotificationStyleType,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

import { Alignment, BorderStyle, CaptionPosition, ImageSecurity, Padding, Ratio } from './types';

const POSITIONING_ID = 'positioning';
const HAS_BACKGROUND_ID = 'hasBackground';
const HAS_BORDER_ID = 'hasBorder';

export const settings = defineSettings({
    basics: [
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: 'Image',
            blocks: [
                {
                    id: 'image',
                    type: 'assetInput',
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
                            id: 'linkUrl',
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
            label: 'Padding',
            info: 'The spacing around the image.',
            on: [
                {
                    id: 'customPadding',
                    type: 'input',
                    onChange: (bundle) => appendUnit(bundle, 'customPadding'),
                    rules: [numericalOrPixelRule],
                },
            ],
            off: [
                {
                    id: 'paddingChoice',
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
            label: 'Show Background',
            defaultValue: false,
            on: [
                {
                    id: 'backgroundColor',
                    type: 'colorInput',
                    defaultValue: { red: 255, green: 255, blue: 255 },
                },
            ],
        },
        {
            id: HAS_BORDER_ID,
            type: 'switch',
            defaultValue: false,
            label: 'Show border',
            on: [
                {
                    id: 'border',
                    type: 'multiInput',
                    lastItemFullWidth: true,
                    onChange: (bundle) => appendUnit(bundle, 'borderWidth'),
                    blocks: [
                        {
                            id: 'borderStyle',
                            type: 'dropdown',
                            defaultValue: BorderStyle.Solid,
                            size: DropdownSize.Small,
                            choices: [
                                {
                                    value: BorderStyle.Dotted,
                                    label: 'Dotted',
                                },
                                {
                                    value: BorderStyle.Dashed,
                                    label: 'Dashed',
                                },
                                {
                                    value: BorderStyle.Solid,
                                    label: 'Solid',
                                },
                            ],
                        },
                        {
                            id: 'borderWidth',
                            type: 'input',
                            defaultValue: '1px',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            clearable: false,
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: { r: 153, g: 153, b: 153 },
                        },
                    ],
                    layout: MultiInputLayout.Columns,
                },
            ],
        },
    ],
    security: [
        {
            id: 'security',
            type: 'slider',
            defaultValue: ImageSecurity.Global,
            info: 'This setting is only available for images that are uploaded to Frontify.',
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
    ],
});
