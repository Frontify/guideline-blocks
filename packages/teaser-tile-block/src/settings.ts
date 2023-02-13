/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Bundle,
    DropdownSize,
    IconEnum,
    SliderBlock,
    SwitchBlock,
    TextInputType,
    defineSettings,
} from '@frontify/guideline-blocks-settings';

enum TileType {
    Text = 'Text',
    Image = 'Image',
    ImageText = 'ImageText',
}

enum TileSpacing {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

enum TilePadding {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

enum TileHeight {
    Auto = 'Auto',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

enum TileDisplay {
    Fill = 'Fill',
    Fit = 'Fit',
}

enum TileImagePositioning {
    Top = 'Top',
    Bottom = 'Bottom',
    Left = 'Left',
    Right = 'Right',
    Behind = 'Behind',
}

enum TileHoizontalAlignment {
    Left = 'Left',
    Right = 'Right',
    Center = 'Center',
}

enum TileVerticalAlignment {
    Top = 'Top',
    Bottom = 'Bottom',
    Center = 'Center',
}

const COLUMN_BLOCK: SliderBlock = {
    id: 'columns',
    type: 'slider',
    label: 'Columns',
    info: 'Sets the maximum amount of columns in this block. On smaller devices, this will be responsive to be fewer',
    choices: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ],
};

const SPACING_BLOCK: SwitchBlock = {
    id: 'spacing',
    type: 'switch',
    label: 'Spacing',
    info: 'Another word for ‘gap’. Refers to both column gutter and row gutter.',
    off: [
        {
            id: 'spacingChoice',
            type: 'slider',
            choices: [
                { value: TileSpacing.None, label: 'None' },
                { value: TileSpacing.Small, label: 'S' },
                { value: TileSpacing.Medium, label: 'M' },
                { value: TileSpacing.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: 'spacingCustom', type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const HEIGHT_BLOCK: SwitchBlock = {
    id: 'height',
    type: 'switch',
    label: 'Height',
    off: [
        {
            id: 'heightChoice',
            type: 'slider',
            choices: [
                { value: TileHeight.Auto, label: 'Auto' },
                { value: TileHeight.Small, label: 'S' },
                { value: TileHeight.Medium, label: 'M' },
                { value: TileHeight.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: 'heightCustom', type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const PADDING_BLOCK: SwitchBlock = {
    id: 'padding',
    type: 'switch',
    label: 'Padding',
    info: 'The spacing between the text and the outer parameters of the tile',
    off: [
        {
            id: 'paddingChoice',
            type: 'slider',
            choices: [
                { value: TilePadding.Small, label: 'S' },
                { value: TilePadding.Medium, label: 'M' },
                { value: TilePadding.Large, label: 'L' },
            ],
        },
    ],
    on: [{ id: 'paddingCustom', type: 'input', inputType: TextInputType.Text, placeholder: '20px' }],
};

const DISPLAY_BLOCK: SliderBlock = {
    id: 'display',
    type: 'slider',
    info: 'Determines how the image fits within the available space. Fill: fits as much into the frame as possible with possible cropping. Fit: Makes sure the whole image is visible in the frame',
    choices: [
        { value: TileDisplay.Fill, label: TileDisplay.Fill },
        { value: TileDisplay.Fit, label: TileDisplay.Fit },
    ],
};

export const settings = defineSettings({
    main: [
        {
            id: 'type',
            type: 'dropdown',
            size: DropdownSize.Large,
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
            show: (bundle: Bundle) => bundle.getBlock('type')?.value === TileType.Text,
            blocks: [COLUMN_BLOCK, SPACING_BLOCK, HEIGHT_BLOCK, PADDING_BLOCK],
        },
        // Image Layout Options
        {
            id: 'image-layout',
            type: 'sectionHeading',
            label: '',
            show: (bundle: Bundle) => bundle.getBlock('type')?.value === TileType.Image,
            blocks: [COLUMN_BLOCK, SPACING_BLOCK, HEIGHT_BLOCK, DISPLAY_BLOCK],
        },
        // Image/Text Layout Options
        {
            id: 'imageText-columns',
            type: 'sectionHeading',
            label: 'Columns',
            show: (bundle: Bundle) => bundle.getBlock('type')?.value === TileType.ImageText,
            blocks: [{ ...COLUMN_BLOCK, label: 'Number' }, SPACING_BLOCK],
        },
        {
            id: 'imageText-tiles',
            type: 'sectionHeading',
            label: 'Tiles',
            show: (bundle: Bundle) => bundle.getBlock('type')?.value === TileType.ImageText,
            blocks: [
                {
                    id: 'positioning',
                    type: 'slider',
                    label: 'Positioning',
                    choices: [
                        { value: TileImagePositioning.Top, icon: IconEnum.MediaObjectTextBottom },
                        { value: TileImagePositioning.Bottom, icon: IconEnum.MediaObjectTextTop },
                        { value: TileImagePositioning.Right, icon: IconEnum.MediaObjectTextLeft },
                        { value: TileImagePositioning.Left, icon: IconEnum.MediaObjectTextRight },
                        { value: TileImagePositioning.Behind, icon: IconEnum.ImageWithText },
                    ],
                },
                {
                    id: 'verticalAlignment',
                    type: 'slider',
                    label: 'Alignment',
                    info: 'This will determine where content is anchored',
                    show: (bundle: Bundle) => bundle.getBlock('positioning')?.value === TileImagePositioning.Behind,
                    choices: [
                        { icon: IconEnum.ArrowAlignUp, value: TileVerticalAlignment.Top },
                        { icon: IconEnum.ArrowAlignVerticalCentre, value: TileVerticalAlignment.Center },
                        { icon: IconEnum.ArrowAlignDown, value: TileVerticalAlignment.Bottom },
                    ],
                },
                {
                    id: 'hoizontalAlignment',
                    type: 'slider',
                    label: 'Alignment',
                    info: 'This will determine where content is anchored',
                    show: (bundle: Bundle) => bundle.getBlock('positioning')?.value !== TileImagePositioning.Behind,
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
});
