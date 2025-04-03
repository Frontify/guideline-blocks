/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    FileExtension,
    IconEnum,
    NotificationStyleType,
    appendUnit,
    createFooter,
    defineSettings,
    getExtendedBorderRadiusSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
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
            size: 'large',
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
            type: 'segmentedControls',
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
                    size: 'small',
                    extensions: [FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
            ],
            off: [
                {
                    id: 'iconType',
                    type: 'segmentedControls',
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
            showForTranslations: true,
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
                    type: 'segmentedControls',
                    label: 'Width',
                    defaultValue: Width.FullWidth,
                    info: "Determines the width of the content. Some settings won't apply if the container is too narrow.",
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
                    type: 'segmentedControls',
                    label: 'Alignment',
                    info: "Some settings won't apply if the container is too narrow.",
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
                            layout: 'spider',
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
                            type: 'segmentedControls',
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
            footer: createFooter({
                label: 'This has been defined in the Global Settings. View or change it [here].',
                replace: { here: { event: 'design-settings.open' } },
            }),
            styles: {
                type: NotificationStyleType.Info,
                icon: true,
            },
        },
    ],
});
