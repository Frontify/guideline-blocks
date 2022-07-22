/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType } from '@frontify/app-bridge';
import type { FileExtension } from '@frontify/app-bridge';
import type { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import type { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
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
            defaultValue: Type.Warning,
            size: 'Large' as DropdownSize.Large,
            choices: [
                {
                    value: Type.Warning,
                    icon: 'Callout' as IconEnum.Callout,
                    label: 'Warning',
                },
                {
                    value: Type.Tip,
                    icon: 'Check' as IconEnum.Check,
                    label: 'Tip',
                },
                {
                    value: Type.Note,
                    icon: 'Briefing' as IconEnum.Briefing,
                    label: 'Note',
                },
                {
                    value: Type.Info,
                    icon: 'Info' as IconEnum.Info,
                    label: 'Info',
                },
            ],
        },
    ],
    content: [
        {
            id: 'iconSwitch',
            type: 'switch',
            defaultValue: true,
            label: 'Icon',
            on: [
                {
                    id: ICON_ASSET_ID,
                    type: 'assetInput',
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
                    choices: [
                        {
                            value: Alignment.Left,
                            icon: 'AlignLeft' as IconEnum.AlignLeft,
                            label: 'Left',
                        },
                        {
                            value: Alignment.Center,
                            icon: 'AlignCenter' as IconEnum.AlignCenter,
                            label: 'Center',
                        },
                        {
                            value: Alignment.Right,
                            icon: 'AlignRight' as IconEnum.AlignRight,
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
                                    label: 'Top',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_TOP_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_LEFT_ID,
                                    type: 'input',
                                    label: 'Left',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_LEFT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_RIGHT_ID,
                                    type: 'input',
                                    label: 'Right',
                                    onChange: (bundle: Bundle): void => appendUnit(bundle, PADDING_RIGHT_ID),
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_BOTTOM_ID,
                                    type: 'input',
                                    label: 'Bottom',
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
    style: [getExtendedBorderRadiusSettings()],
};
