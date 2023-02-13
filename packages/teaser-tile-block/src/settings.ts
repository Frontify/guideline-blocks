/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Bundle,
    DropdownSize,
    IconEnum,
    SliderBlock,
    SwitchBlock,
    SwitchSize,
    TextInputType,
    defineSettings,
} from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import {
    SettingsEnum,
    TileDisplay,
    TileHeight,
    TileHoizontalAlignment,
    TileImagePositioning,
    TilePadding,
    TileSpacing,
    TileType,
    TileVerticalAlignment,
} from './types';

const COLUMN_BLOCK: SliderBlock = {
    id: SettingsEnum.Columns,
    type: 'slider',
    label: 'Columns',
    info: 'Sets the maximum amount of columns in this block. On smaller devices, this will be responsive to be fewer',
    defaultValue: '2',
    choices: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ],
};

const SPACING_BLOCK: SwitchBlock = {
    id: SettingsEnum.Spacing,
    type: 'switch',
    label: 'Spacing',
    switchLabel: 'Custom',
    info: 'Another word for ‘gap’. Refers to both column gutter and row gutter.',
    show: (bundle: Bundle) => bundle.getBlock('columns')?.value !== '1',
    defaultValue: false,
    off: [
        {
            id: SettingsEnum.SpacingChoice,
            type: 'slider',
            defaultValue: TileSpacing.Small,
            choices: [
                { value: TileSpacing.None, label: 'None' },
                { value: TileSpacing.Small, label: 'S' },
                { value: TileSpacing.Medium, label: 'M' },
                { value: TileSpacing.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: SettingsEnum.SpacingCustom, type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const HEIGHT_BLOCK: SwitchBlock = {
    id: SettingsEnum.Height,
    type: 'switch',
    label: 'Height',
    switchLabel: 'Custom',
    defaultValue: false,
    off: [
        {
            id: SettingsEnum.HeightChoice,
            type: 'slider',
            defaultValue: TileHeight.Auto,
            choices: [
                { value: TileHeight.Auto, label: 'Auto' },
                { value: TileHeight.Small, label: 'S' },
                { value: TileHeight.Medium, label: 'M' },
                { value: TileHeight.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: SettingsEnum.HeightCustom, type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const PADDING_BLOCK: SwitchBlock = {
    id: SettingsEnum.Padding,
    type: 'switch',
    label: 'Padding',
    switchLabel: 'Custom',
    info: 'The spacing between the text and the outer parameters of the tile',
    defaultValue: false,
    off: [
        {
            id: SettingsEnum.PaddingChoice,
            type: 'slider',
            defaultValue: TilePadding.Small,
            choices: [
                { value: TilePadding.Small, label: 'S' },
                { value: TilePadding.Medium, label: 'M' },
                { value: TilePadding.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: SettingsEnum.PaddingCustom, type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const DISPLAY_BLOCK: SliderBlock = {
    id: SettingsEnum.Display,
    type: 'slider',
    label: 'Display',
    info: 'Determines how the image fits within the available space. Fill: fits as much into the frame as possible with possible cropping. Fit: Makes sure the whole image is visible in the frame',
    show: (bundle: Bundle) =>
        Boolean(
            bundle.getBlock(SettingsEnum.Height)?.value ||
                bundle.getBlock(SettingsEnum.HeightChoice)?.value !== TileHeight.Auto
        ),
    defaultValue: TileDisplay.Fill,
    choices: [
        { value: TileDisplay.Fill, label: TileDisplay.Fill },
        { value: TileDisplay.Fit, label: TileDisplay.Fit },
    ],
};

export const settings = defineSettings({
    main: [
        {
            id: SettingsEnum.Type,
            type: 'dropdown',
            size: DropdownSize.Large,
            defaultValue: TileType.ImageText,
            choices: [
                { value: TileType.Text, icon: IconEnum.TextAlignmentLeft, label: 'Text' },
                { value: TileType.Image, icon: IconEnum.Image, label: 'Image' },
                { value: TileType.ImageText, icon: IconEnum.Card, label: 'Image and text' },
            ],
        },
    ],
    layout: [
        // Text Layout options
        {
            id: 'text-layout',
            type: 'sectionHeading',
            label: '',
            show: (bundle: Bundle) => bundle.getBlock(SettingsEnum.Type)?.value === TileType.Text,
            blocks: [COLUMN_BLOCK, SPACING_BLOCK, HEIGHT_BLOCK, PADDING_BLOCK],
        },
        // Image Layout Options
        {
            id: 'image-layout',
            type: 'sectionHeading',
            label: '',
            show: (bundle: Bundle) => bundle.getBlock(SettingsEnum.Type)?.value === TileType.Image,
            blocks: [COLUMN_BLOCK, SPACING_BLOCK, HEIGHT_BLOCK, DISPLAY_BLOCK],
        },
        // Image/Text Layout Options
        {
            id: 'imageText-columns',
            type: 'sectionHeading',
            label: 'Columns',
            show: (bundle: Bundle) => bundle.getBlock(SettingsEnum.Type)?.value === TileType.ImageText,
            blocks: [{ ...COLUMN_BLOCK, label: 'Number' }, SPACING_BLOCK],
        },
        {
            id: 'imageText-tiles',
            type: 'sectionHeading',
            label: 'Tiles',
            show: (bundle: Bundle) => bundle.getBlock(SettingsEnum.Type)?.value === TileType.ImageText,
            blocks: [
                {
                    id: SettingsEnum.Positioning,
                    type: 'slider',
                    label: 'Positioning',
                    defaultValue: TileImagePositioning.Top,
                    choices: [
                        { value: TileImagePositioning.Top, icon: IconEnum.MediaObjectTextBottom },
                        { value: TileImagePositioning.Bottom, icon: IconEnum.MediaObjectTextTop },
                        { value: TileImagePositioning.Right, icon: IconEnum.MediaObjectTextLeft },
                        { value: TileImagePositioning.Left, icon: IconEnum.MediaObjectTextRight },
                        { value: TileImagePositioning.Behind, icon: IconEnum.ImageWithText },
                    ],
                },
                {
                    id: SettingsEnum.VerticalAlignment,
                    type: 'slider',
                    label: 'Alignment',
                    info: 'This will determine where content is anchored',
                    show: (bundle: Bundle) =>
                        bundle.getBlock(SettingsEnum.Positioning)?.value === TileImagePositioning.Behind,
                    defaultValue: TileVerticalAlignment.Center,
                    choices: [
                        { icon: IconEnum.ArrowAlignUp, value: TileVerticalAlignment.Top },
                        { icon: IconEnum.ArrowAlignVerticalCentre, value: TileVerticalAlignment.Center },
                        { icon: IconEnum.ArrowAlignDown, value: TileVerticalAlignment.Bottom },
                    ],
                },
                {
                    id: SettingsEnum.HorizontalAlignment,
                    type: 'slider',
                    label: 'Alignment',
                    info: 'This will determine where content is anchored',
                    show: (bundle: Bundle) =>
                        bundle.getBlock(SettingsEnum.Positioning)?.value !== TileImagePositioning.Behind,
                    defaultValue: TileHoizontalAlignment.Left,
                    choices: [
                        { icon: IconEnum.ArrowAlignLeft, value: TileHoizontalAlignment.Left },
                        { icon: IconEnum.ArrowAlignHorizontalCentre, value: TileHoizontalAlignment.Center },
                        { icon: IconEnum.ArrowAlignRight, value: TileHoizontalAlignment.Right },
                    ],
                },
                { ...PADDING_BLOCK, label: 'Text Padding' },
            ],
        },
        {
            id: 'imageText-images',
            type: 'sectionHeading',
            label: 'Images',
            show: (bundle: Bundle) => bundle.getBlock('type')?.value === TileType.ImageText,
            blocks: [HEIGHT_BLOCK, DISPLAY_BLOCK],
        },
    ],
    style: [
        {
            id: SettingsEnum.Background,
            type: 'switch',
            label: 'Background',
            size: SwitchSize.Small,
            defaultValue: false,
            on: [{ id: SettingsEnum.BackgroundColor, type: 'colorInput' }],
        },
        getBorderSettings(),
        getBorderRadiusSettings(),
    ],
});
