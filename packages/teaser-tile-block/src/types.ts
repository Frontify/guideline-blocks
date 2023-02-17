/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { FlyoutPlacement, FlyoutProps, Palette } from '@frontify/fondue';
import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, DesignTokenName, Radius, TokenValues } from '@frontify/guideline-blocks-shared';
import { ReactNode } from 'react';

export enum SettingsEnum {
    Type = 'type',
    Columns = 'columns',
    Spacing = 'isSpacingCustom',
    SpacingChoice = 'spacingChoice',
    SpacingCustom = 'spacingCustom',
    Height = 'isHeightCustom',
    HeightChoice = 'heightChoice',
    HeightCustom = 'heightCustom',
    Padding = 'isPaddingCustom',
    PaddingChoice = 'paddingChoice',
    PaddingCustom = 'paddingCustom',
    Display = 'display',
    Positioning = 'positioning',
    VerticalAlignment = 'verticalAlignment',
    HorizontalAlignment = 'horizontalAlignment',
    Background = 'isBackgroundVisible',
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
    isBackgroundVisible: Nullable<boolean>;
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

export type TileGridProps = {
    children: ReactNode;
    gridGap: string;
    columns: string;
};

export type SortableTeaserTileProps = {
    id: string;
    blockSettings: Settings;
    appBridge: AppBridgeBlock;
    tileSettings: TileSettings;
    onTileSettingsChange: (id: string, partialSettings: Partial<TileSettings>) => void;
    onRemoveTile: (id: string) => void;
    isEditing: boolean;
    palettes: Nullable<Palette[]>;
    blockAssets: Record<string, Asset[]>;
    updateAssetIdsFromKey: (key: string, newAssetIds: number[]) => Promise<void> | void;
    designTokens: Nullable<Partial<Record<DesignTokenName, TokenValues>>>;
};

export type TeaserTileProps = SortableTeaserTileProps & {
    isDragging?: boolean;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
    isDragPreview?: boolean;
};

export type TeaserTileToolbarProps = {
    type: TileType;
    draggableProps?: Record<string, unknown>;
    isDragging?: boolean;
    onRemoveSelf: () => void;
    tileSettingsFlyoutProps: {
        [TileType.Text]: Omit<
            TextFlyoutProps,
            'isOpen' | 'setIsOpen' | 'children' | 'placement' | 'title' | 'description'
        >;
        [TileType.Image]: Omit<
            ImageFlyoutProps,
            'isOpen' | 'setIsOpen' | 'children' | 'placement' | 'title' | 'description'
        >;
        [TileType.ImageText]: Omit<
            ImageTextFlyoutProps,
            'isOpen' | 'setIsOpen' | 'children' | 'placement' | 'title' | 'description'
        >;
    };
    onToolbarBlur: () => void;
    onToolbarFocus: () => void;
    isToolbarFocused: boolean;
};

export type Link = { href?: string; target?: string };

export type BaseFlyoutProps = Pick<TileSettings, 'backgroundColor' | 'isBackgroundVisible' | 'display' | 'link'> & {
    height: string;
    isOpen: boolean;
    disabled: boolean;
    palettes: Palette[];
    placement: FlyoutPlacement;
    children: FlyoutProps['trigger'];
    onLinkChange: (link: Link) => void;
    setIsOpen: (boolean: boolean) => void;
    onBackgroundColorChange: (color: Color) => void;
    onBackgroundVisibilityChange: (visibility: boolean) => void;
};

export type ImageTextFlyoutProps = BaseFlyoutProps & {
    asset: Nullable<Asset>;
    isAssetLoading: boolean;
    type: TileType.ImageText;
    onReplaceAssetFromUpload: () => void;
    onUploadFile: (files: FileList) => void;
    onReplaceAssetFromWorkspace: () => void;
    onDisplayChange: (display: TileDisplay) => void;
};

export type ImageFlyoutProps = BaseFlyoutProps & {
    type: TileType.Image;
    asset: Nullable<Asset>;
    isAssetLoading: boolean;
    onReplaceAssetFromUpload: () => void;
    onReplaceAssetFromWorkspace: () => void;
    onUploadFile: (files: FileList) => void;
    onDisplayChange: (display: TileDisplay) => void;
};

export type TextFlyoutProps = BaseFlyoutProps & {
    asset?: never;
    type: TileType.Text;
    onUploadFile?: never;
    isAssetLoading?: never;
    onDisplayChange?: never;
    onReplaceAssetFromUpload?: never;
    onReplaceAssetFromWorkspace?: never;
};

export type TileSettingsFlyoutProps = TextFlyoutProps | ImageFlyoutProps | ImageTextFlyoutProps;
