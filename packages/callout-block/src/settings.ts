/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtension } from '@frontify/app-bridge';
import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/arcade';
import { Bundle, BlockSettings } from '@frontify/guideline-blocks-settings';
import { appendUnitToArray, numericalOrPixelRule } from '@frontify/guideline-blocks-shared';
import { Alignment, CornerRadius, Padding, Type, Width } from './types';

const CUSTOM_PADDING_ID = 'customPadding';
const CUSTOM_RADIUS_ID = 'customCornerRadius';
const PADDING_TOP_ID = 'padding-top';
const PADDING_LEFT_ID = 'padding-left';
const PADDING_RIGHT_ID = 'padding-right';
const PADDING_BOTTOM_ID = 'padding-bottom';
const RADIUS_TOPLEFT_ID = 'radius-top-left';
const RADIUS_TOPRIGHT_ID = 'radius-top-right';
const RADIUS_BOTTOMLEFT_ID = 'radius-bottom-left';
const RADIUS_BOTTOMRIGHT_ID = 'radius-bottom-right';

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
                    allowedExtensions: [FileExtension.Svg],
                },
            ],
        },
    ],
    layout: [
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
                    id: 'padding',
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
    style: [
        {
            id: 'customCornerRadiusSwitch',
            type: 'switch',
            defaultValue: false,
            switchLabel: 'Custom',
            label: 'Corner radius',
            on: [
                {
                    id: CUSTOM_RADIUS_ID,
                    type: 'multiInput',
                    layout: MultiInputLayout.Columns,
                    onChange: (bundle: Bundle): void => appendUnitToArray(bundle, CUSTOM_RADIUS_ID),
                    blocks: [
                        {
                            id: RADIUS_TOPLEFT_ID,
                            type: 'input',
                            label: 'Top Left',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: RADIUS_TOPRIGHT_ID,
                            type: 'input',
                            label: 'Top Right',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: RADIUS_BOTTOMLEFT_ID,
                            type: 'input',
                            label: 'Bottom Left',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: RADIUS_BOTTOMRIGHT_ID,
                            type: 'input',
                            label: 'Bottom Right',
                            rules: [numericalOrPixelRule],
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'cornerRadius',
                    type: 'slider',
                    defaultValue: CornerRadius.None,
                    choices: [
                        {
                            value: CornerRadius.None,
                            label: 'None',
                        },
                        {
                            value: CornerRadius.S,
                            label: 'S',
                        },
                        {
                            value: CornerRadius.M,
                            label: 'M',
                        },
                        {
                            value: CornerRadius.L,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};

// eslint-disable-next-line import/no-default-export
export default settings;
