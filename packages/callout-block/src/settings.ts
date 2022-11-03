/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { FileExtension } from '@frontify/app-bridge';
import { AssetChooserObjectType } from '@frontify/app-bridge';
import { AssetInputSize, DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import { BlockSettings, Bundle, NotificationStyleType } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    getExtendedBorderRadiusSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import { Alignment, Padding, Type, Width, leftRightPaddingMap, topBottomPaddingMap } from './types';

const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_TOP_ID = 'paddingTop';
const PADDING_LEFT_ID = 'paddingLeft';
const PADDING_RIGHT_ID = 'paddingRight';
const PADDING_BOTTOM_ID = 'paddingBottom';
export const ICON_ASSET_ID = 'icon';

export const settings: BlockSettings = {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: Type.Info,
            size: 'Large' as DropdownSize.Large,
            choices: [
                {
                    value: Type.Info,
                    icon: 'Info' as IconEnum.Info,
                    label: 'Info',
                },
                {
                    value: Type.Note,
                    icon: 'DocumentText' as IconEnum.DocumentText,
                    label: 'Note',
                },
                {
                    value: Type.Tip,
                    icon: 'CheckMark' as IconEnum.CheckMark,
                    label: 'Tip',
                },
                {
                    value: Type.Warning,
                    icon: 'ExclamationMarkTriangle' as IconEnum.ExclamationMarkTriangle,
                    label: 'Warning',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'iconSwitch',
            type: 'switch',
            defaultValue: false,
            label: 'Icon',
            on: [
                {
                    id: ICON_ASSET_ID,
                    type: 'assetInput',
                    size: AssetInputSize.Small,
                    extensions: ['svg' as FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
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
                            icon: 'ArrowAlignLeft' as IconEnum.ArrowAlignLeft,
                            label: 'Left',
                        },
                        {
                            value: Alignment.Center,
                            icon: 'ArrowAlignVerticalCentre' as IconEnum.ArrowAlignVerticalCentre,
                            label: 'Center',
                        },
                        {
                            value: Alignment.Right,
                            icon: 'ArrowAlignRight' as IconEnum.ArrowAlignRight,
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
                    onChange: (bundle: Bundle): void => {
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_TOP_ID, topBottomPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_BOTTOM_ID, topBottomPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_LEFT_ID, leftRightPaddingMap);
                        presetCustomValue(bundle, PADDING_CHOICE_ID, PADDING_RIGHT_ID, leftRightPaddingMap);
                    },
                    on: [
                        {
                            id: 'customPadding',
                            type: 'multiInput',
                            layout: 'Spider' as MultiInputLayout.Spider,
                            blocks: [
                                {
                                    id: PADDING_TOP_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignUp16,
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_TOP_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_LEFT_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignLeft16,
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_LEFT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_RIGHT_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignRight16,
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_RIGHT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_BOTTOM_ID,
                                    type: 'input',
                                    icon: IconEnum.ArrowAlignDown16,
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_BOTTOM_ID),
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
};
