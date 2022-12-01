/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    AssetInputSize,
    DropdownSize,
    FileExtension,
    IconEnum,
    MultiInputLayout,
    NotificationStyleType,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { getExtendedBorderRadiusSettings } from '@frontify/guideline-blocks-shared';
import { Alignment, Appearance, Icon, Padding, Type, Width, leftRightPaddingMap, topBottomPaddingMap } from './types';

const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_TOP_ID = 'paddingTop';
const PADDING_LEFT_ID = 'paddingLeft';
const PADDING_RIGHT_ID = 'paddingRight';
const PADDING_BOTTOM_ID = 'paddingBottom';
export const ICON_ASSET_ID = 'icon';

export const settings = defineSettings({
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: Type.Info,
            size: DropdownSize.Large,
            choices: [
                {
                    value: Type.Info,
                    icon: IconEnum.Info,
                    label: 'Information',
                },
                {
                    value: Type.Note,
                    icon: IconEnum.DocumentText,
                    label: 'Note',
                },
                {
                    value: Type.Tip,
                    icon: IconEnum.CheckMark,
                    label: 'Tip',
                },
                {
                    value: Type.Warning,
                    icon: IconEnum.ExclamationMarkTriangle,
                    label: 'Warning',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'appearance',
            type: 'slider',
            label: 'Appearance',
            defaultValue: Appearance.Light,
            info: 'Defines how the accent color is shown on this block. Select between a subtle and more prominent style.',
            choices: [
                {
                    label: 'Light',
                    value: Appearance.Light,
                },
                {
                    label: 'Strong',
                    value: Appearance.Strong,
                },
            ],
        },

        {
            id: 'iconSwitch',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            info: 'Custom icons will always display the same way, they were created. To tweak icon colors, apply the changes in the icon, then upload it again.',
            label: 'Icon',
            on: [
                {
                    id: ICON_ASSET_ID,
                    type: 'assetInput',
                    size: AssetInputSize.Small,
                    extensions: [FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
            ],
            off: [
                {
                    id: 'iconType',
                    type: 'slider',
                    defaultValue: Icon.None,
                    choices: [
                        {
                            label: 'None',
                            value: Icon.None,
                        },
                        {
                            icon: IconEnum.Info,
                            value: Icon.Info,
                        },
                        {
                            icon: IconEnum.Lightbulb,
                            value: Icon.Lightbulb,
                        },
                        {
                            icon: IconEnum.Megaphone,
                            value: Icon.Megaphone,
                        },
                    ],
                },
            ],
        },
    ],
    layout: [
        {
            id: 'backgroundSection',
            type: 'sectionHeading',
            label: 'Background',
            blocks: [
                {
                    id: 'width',
                    type: 'slider',
                    label: 'Width',
                    defaultValue: Width.FullWidth,
                    info: 'Determines the width of the content',
                    choices: [
                        {
                            label: 'Full Width',
                            value: Width.FullWidth,
                        },
                        {
                            label: 'Hug Contents',
                            value: Width.HugContents,
                        },
                    ],
                },
                {
                    id: 'alignment',
                    type: 'slider',
                    label: 'Alignment',
                    defaultValue: Alignment.Left,
                    show: (bundle) => bundle.getBlock('width')?.value === Width.HugContents,
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
                    info: 'The spacing around UI elements to create more negative space',
                    onChange: (bundle) => {
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_TOP_ID, topBottomPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_BOTTOM_ID, topBottomPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_LEFT_ID, leftRightPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_RIGHT_ID, leftRightPaddingMap);
                    },
                    on: [
                        {
                            id: 'customPadding',
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            blocks: [
                                {
                                    id: PADDING_TOP_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignUp16,
                                    onChange: (bundle) => appendUnit(bundle, PADDING_TOP_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_LEFT_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignLeft16,
                                    onChange: (bundle) => appendUnit(bundle, PADDING_LEFT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_RIGHT_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignRight16,
                                    onChange: (bundle) => appendUnit(bundle, PADDING_RIGHT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_BOTTOM_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignDown16,
                                    onChange: (bundle) => appendUnit(bundle, PADDING_BOTTOM_ID),
                                    rules: [numericalOrPixelRule],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: PADDING_CHOICE_ID,
                            type: 'slider',
                            defaultValue: Padding.M,
                            choices: [
                                {
                                    value: Padding.S,
                                    label: 'S',
                                },
                                {
                                    value: Padding.M,
                                    label: 'M',
                                },
                                {
                                    value: Padding.L,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        getExtendedBorderRadiusSettings(),
        {
            id: 'colorInGlobalSettingsInfo',
            type: 'notification',
            title: 'Color',
            text: 'This has been defined in the Global Settings.',
            styles: {
                type: NotificationStyleType.Info,
                icon: true,
            },
            link: {
                href: 'https://help.frontify.com/en/articles/1346386-how-to-customize-your-style-guide',
                label: 'Read more here.',
                target: '_blank',
            },
        },
    ],
});
