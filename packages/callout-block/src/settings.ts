/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, FileExtension } from '@frontify/app-bridge';
import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/arcade';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import {
    appendUnitToArray,
    getExtendedBorderRadiusSettings,
    numericalOrPixelRule,
    presetCustomArrayValue,
} from '@frontify/guideline-blocks-shared';
import { Alignment, Padding, paddingValuesMap, Type, Width } from './types';

const CHOICE_PADDING_ID = 'padding';
const CUSTOM_PADDING_ID = 'customPadding';
const PADDING_TOP_ID = 'padding-top';
const PADDING_LEFT_ID = 'padding-left';
const PADDING_RIGHT_ID = 'padding-right';
const PADDING_BOTTOM_ID = 'padding-bottom';

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
                    id: 'customPaddingSwitch',
                    type: 'switch',
                    defaultValue: false,
                    switchLabel: 'Custom',
                    label: 'Padding',
                    onChange: (bundle: Bundle): void =>
                        presetCustomArrayValue(bundle, CHOICE_PADDING_ID, CUSTOM_PADDING_ID, paddingValuesMap, 4),
                    on: [
                        {
                            id: CUSTOM_PADDING_ID,
                            type: 'multiInput',
                            layout: MultiInputLayout.Spider,
                            onChange: (bundle: Bundle): void => appendUnitToArray(bundle, CUSTOM_PADDING_ID),
                            blocks: [
                                {
                                    id: PADDING_TOP_ID,
                                    type: 'input',
                                    label: 'Top',
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_LEFT_ID,
                                    type: 'input',
                                    label: 'Left',
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_RIGHT_ID,
                                    type: 'input',
                                    label: 'Right',
                                    rules: [numericalOrPixelRule],
                                },
                                {
                                    id: PADDING_BOTTOM_ID,
                                    type: 'input',
                                    label: 'Bottom',
                                    rules: [numericalOrPixelRule],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: CHOICE_PADDING_ID,
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
