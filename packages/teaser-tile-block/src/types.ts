/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';

export enum SettingsEnum {
    Type = 'type',
    Columns = 'columns',
    Spacing = 'spacing',
    SpacingChoice = 'spacingChoice',
    SpacingCustom = 'spacingCustom',
    Height = 'height',
    HeightChoice = 'heightChoice',
    HeightCustom = 'heightCustom',
    Padding = 'padding',
    PaddingChoice = 'paddingChoice',
    PaddingCustom = 'paddingCustom',
    Display = 'display',
    Positioning = 'positioning',
    VerticalAlignment = 'verticalAlignment',
    HorizontalAlignment = 'HorizontalAlignment',
    Background = 'background',
    BackgroundColor = 'backgroundColor',
    HasBorder = 'hasBorder',
    BorderColor = 'borderColor',
    BorderStyle = 'borderStyle',
    BorderWidth = 'borderWidth',
    HasRadius = 'hasRadius',
    RadiusChoice = 'radiusChoice',
    RadiusValue = 'radiusValue',
}

export type Settings = {
    [SettingsEnum.Type]: TileType;
    [SettingsEnum.Columns]: TileColumns;
    [SettingsEnum.Spacing]: boolean;
    [SettingsEnum.SpacingChoice]: TileSpacing;
    [SettingsEnum.SpacingCustom]: string;
    [SettingsEnum.Height]: boolean;
    [SettingsEnum.HeightChoice]: TileHeight;
    [SettingsEnum.HeightCustom]: string;
    [SettingsEnum.Padding]: boolean;
    [SettingsEnum.PaddingChoice]: TilePadding;
    [SettingsEnum.PaddingCustom]: string;
    [SettingsEnum.Display]: TileDisplay;
    [SettingsEnum.Positioning]: TileImagePositioning;
    [SettingsEnum.VerticalAlignment]: TileVerticalAlignment;
    [SettingsEnum.HorizontalAlignment]: TileHoizontalAlignment;
    [SettingsEnum.Background]: boolean;
    [SettingsEnum.BackgroundColor]: Color;
    [SettingsEnum.HasBorder]: boolean;
    [SettingsEnum.BorderColor]: Color;
    [SettingsEnum.BorderStyle]: BorderStyle;
    [SettingsEnum.BorderWidth]: string;
    [SettingsEnum.HasRadius]: boolean;
    [SettingsEnum.RadiusChoice]: Radius;
    [SettingsEnum.RadiusValue]: string;
};

export enum TileType {
    Text = 'Text',
    Image = 'Image',
    ImageText = 'ImageText',
}

export enum TileSpacing {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum TilePadding {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum TileHeight {
    Auto = 'Auto',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum TileDisplay {
    Fill = 'Fill',
    Fit = 'Fit',
}

export type TileColumns = '1' | '2' | '3' | '4';

export enum TileImagePositioning {
    Top = 'Top',
    Bottom = 'Bottom',
    Left = 'Left',
    Right = 'Right',
    Behind = 'Behind',
}

export enum TileHoizontalAlignment {
    Left = 'Left',
    Right = 'Right',
    Center = 'Center',
}

export enum TileVerticalAlignment {
    Top = 'Top',
    Bottom = 'Bottom',
    Center = 'Center',
}
