/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Palette } from '@frontify/fondue';
import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { Link } from './components/TileSettingsFlyout';

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
    HorizontalAlignment = 'horizontalAlignment',
    Background = 'background',
    BackgroundColor = 'backgroundColor',
    HasBorder = 'hasBorder',
    BorderColor = 'borderColor',
    BorderStyle = 'borderStyle',
    BorderWidth = 'borderWidth',
    HasRadius = 'hasRadius',
    RadiusChoice = 'radiusChoice',
    RadiusValue = 'radiusValue',
    Tiles = 'tiles',
}

export type TileSettings = {
    link: Nullable<Link>;
    display: Nullable<TileDisplay>;
    backgroundColor: Nullable<Color>;
    backgroundVisibility: Nullable<boolean>;
    description: Nullable<string>;
    title: Nullable<string>;
};

export type Tile = {
    id: string;
    settings: TileSettings;
};

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
    [SettingsEnum.HorizontalAlignment]: TileHorizontalAlignment;
    [SettingsEnum.Background]: boolean;
    [SettingsEnum.BackgroundColor]: Color;
    [SettingsEnum.HasBorder]: boolean;
    [SettingsEnum.BorderColor]: Color;
    [SettingsEnum.BorderStyle]: BorderStyle;
    [SettingsEnum.BorderWidth]: string;
    [SettingsEnum.HasRadius]: boolean;
    [SettingsEnum.RadiusChoice]: Radius;
    [SettingsEnum.RadiusValue]: string;
    [SettingsEnum.Tiles]?: Tile[];
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

export enum TileHorizontalAlignment {
    Left = 'Left',
    Right = 'Right',
    Center = 'Center',
}

export enum TileVerticalAlignment {
    Top = 'Top',
    Bottom = 'Bottom',
    Center = 'Center',
}

export type Nullable<T> = T | null;

export type SortableTeaserTileProps = {
    id: string;
    blockSettings: Settings;
    appBridge: AppBridgeBlock;
    tileSettings: TileSettings;
    onTileSettingsChange: (partialSettings: Partial<TileSettings>) => void;
    onRemoveTile: () => void;
    isEditing: boolean;
    palettes: Nullable<Palette[]>;
    blockAssets: Record<string, Asset[]>;
    updateAssetIdsFromKey: (key: string, newAssetIds: number[]) => Promise<void>;
};

export type TeaserTileProps = SortableTeaserTileProps & {
    isDragging?: boolean;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
    isDragPreview?: boolean;
};
