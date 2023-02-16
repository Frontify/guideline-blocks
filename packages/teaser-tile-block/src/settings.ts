/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Bundle,
    DropdownSize,
    IconEnum,
    SwitchSize,
    TextInputType,
    defineSettings,
} from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import {
    SettingsEnum,
    TileDisplay,
    TileHeight,
    TileHorizontalAlignment,
    TileImagePositioning,
    TilePadding,
    TileSpacing,
    TileType,
    TileVerticalAlignment,
} from './types';

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
        {
            id: 'columns-section',
            type: 'sectionHeading',
            label: 'Columns',
            blocks: [
                {
                    id: SettingsEnum.Columns,
                    type: 'slider',
                    label: 'Number',
                    info: 'Sets the maximum amount of columns in this block. On smaller devices, this will be responsive to be fewer',
                    defaultValue: '2',
                    choices: [
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                    ],
                },
                {
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
                    on: [
                        {
                            id: SettingsEnum.SpacingCustom,
                            type: 'input',
                            inputType: TextInputType.Text,
                            placeholder: '20px',
                        },
                    ],
                },
            ],
        },
        {
            id: 'tiles-section',
            type: 'sectionHeading',
            label: 'Tiles',
            blocks: [
                {
                    id: SettingsEnum.Positioning,
                    type: 'slider',
                    label: 'Positioning',
                    show: (bundle) => bundle.getBlock(SettingsEnum.Type)?.value === TileType.ImageText,
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
                        bundle.getBlock(SettingsEnum.Type)?.value === TileType.ImageText &&
                        bundle.getBlock(SettingsEnum.Positioning)?.value === TileImagePositioning.Behind,
                    defaultValue: TileVerticalAlignment.Center,
                    choices: [
                        { icon: IconEnum.ArrowAlignUp, value: TileVerticalAlignment.Top },
                        { icon: IconEnum.ArrowAlignHorizontalCentre, value: TileVerticalAlignment.Center },
                        { icon: IconEnum.ArrowAlignDown, value: TileVerticalAlignment.Bottom },
                    ],
                },
                {
                    id: SettingsEnum.HorizontalAlignment,
                    type: 'slider',
                    label: 'Alignment',
                    info: 'This will determine where content is anchored',
                    show: (bundle: Bundle) =>
                        bundle.getBlock(SettingsEnum.Type)?.value === TileType.ImageText &&
                        bundle.getBlock(SettingsEnum.Positioning)?.value !== TileImagePositioning.Behind,
                    defaultValue: TileHorizontalAlignment.Left,
                    choices: [
                        { icon: IconEnum.ArrowAlignLeft, value: TileHorizontalAlignment.Left },
                        { icon: IconEnum.ArrowAlignVerticalCentre, value: TileHorizontalAlignment.Center },
                        { icon: IconEnum.ArrowAlignRight, value: TileHorizontalAlignment.Right },
                    ],
                },
                {
                    id: SettingsEnum.Padding,
                    type: 'switch',
                    label: (bundle: Bundle) =>
                        bundle.getBlock(SettingsEnum.Type)?.value === TileType.Text ? 'Padding' : 'Text padding',
                    switchLabel: 'Custom',
                    info: 'The spacing between the text and the outer parameters of the tile',
                    show: (bundle: Bundle) => bundle.getBlock(SettingsEnum.Type)?.value !== TileType.Image,
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
                    on: [
                        {
                            id: SettingsEnum.PaddingCustom,
                            type: 'input',
                            inputType: TextInputType.Text,
                            placeholder: '20px',
                        },
                    ],
                },
            ],
        },
        {
            id: 'images-section',
            type: 'sectionHeading',
            label: 'Images',
            blocks: [
                {
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
                    on: [
                        {
                            id: SettingsEnum.HeightCustom,
                            type: 'input',
                            inputType: TextInputType.Text,
                            placeholder: '20px',
                        },
                    ],
                },
                {
                    id: SettingsEnum.Display,
                    type: 'slider',
                    label: 'Display',
                    info: 'Determines how the image fits within the available space. Fill: fits as much into the frame as possible with possible cropping. Fit: Makes sure the whole image is visible in the frame',
                    show: (bundle: Bundle) =>
                        Boolean(
                            bundle.getBlock(SettingsEnum.Type)?.value !== TileType.Text &&
                                (bundle.getBlock(SettingsEnum.Height)?.value ||
                                    bundle.getBlock(SettingsEnum.HeightChoice)?.value !== TileHeight.Auto)
                        ),
                    defaultValue: TileDisplay.Fill,
                    choices: [
                        { value: TileDisplay.Fill, label: TileDisplay.Fill },
                        { value: TileDisplay.Fit, label: TileDisplay.Fit },
                    ],
                },
            ],
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