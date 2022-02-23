/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, FileExtension } from '@frontify/app-bridge';
import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/arcade';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    getExtendedBorderRadiusSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import { Alignment, leftRightPaddingMap, Padding, topBottomPaddingMap, Type, Width } from './types';

const PADDING_CHOICE_ID = 'paddingChoice';
const PADDING_TOP_ID = 'paddingTop';
const PADDING_LEFT_ID = 'paddingLeft';
const PADDING_RIGHT_ID = 'paddingRight';
const PADDING_BOTTOM_ID = 'paddingBottom';

const settings: BlockSettings = {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: Type.Warning,
            size: DropdownSize.Large,
            choices: [
                {
                    value: Type.Warning,
                    icon: IconEnum.Callout,
                    label: 'Warning',
                },
                {
                    value: Type.Tip,
                    icon: IconEnum.Check,
                    label: 'Tip',
                },
                {
                    value: Type.Note,
                    icon: IconEnum.Briefing,
                    label: 'Note',
                },
                {
                    value: Type.Info,
                    icon: IconEnum.Info,
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
                    id: 'icon',
                    type: 'assetInput',
                    extensions: [FileExtension.Svg],
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
                            icon: IconEnum.AlignLeft,
                            label: 'Left',
                        },
                        {
                            value: Alignment.Center,
                            icon: IconEnum.AlignCenter,
                            label: 'Center',
                        },
                        {
                            value: Alignment.Right,
                            icon: IconEnum.AlignRight,
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
                            layout: MultiInputLayout.Spider,
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

// eslint-disable-next-line import/no-default-export
export default settings;
