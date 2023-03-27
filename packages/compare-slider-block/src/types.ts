/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, DesignTokenName, Radius, TokenValues } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

export const FIRST_ASSET_ID = 'firstAsset';
export const SECOND_ASSET_ID = 'secondAsset';

export type BlockSettings = {
    alignment: Alignment;

    hasCustomHeight: boolean;
    height: Height;
    customHeight: string;

    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderColor: Color;
    borderWidth: string;

    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;

    firstAssetLabel: string;
    firstAssetLabelPlacementHorizontal: LabelPlacement;
    firstAssetLabelPlacementVertical: LabelPlacement;

    secondAssetLabel: string;
    secondAssetLabelPlacementHorizontal: LabelPlacement;
    secondAssetLabelPlacementVertical: LabelPlacement;

    handle: Handle;

    sliderColor: Color;
    sliderWidth: string;
    sliderStyle: BorderStyle;

    backgroundColor: Color;
    hasBackground: boolean;

    firstAssetHasStrikethrough: boolean;
    secondAssetHasStrikethrough: boolean;

    strikethroughColorSource: InheritSettings;
    customStrikeThroughColor: Color;
};

export enum SliderImageSlot {
    First = 'first',
    Second = 'second',
}

export const slotAssetSettingMap: Record<SliderImageSlot, string> = {
    [SliderImageSlot.First]: 'firstAsset',
    [SliderImageSlot.Second]: 'secondAsset',
};

export enum LabelPlacement {
    Top = 'top',
    Center = 'center',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right',
}

export enum InheritSettings {
    INHERIT = 'inherit',
    OVERRIDE = 'override',
}

export const horizontalLabelPlacementStyleMap: Partial<Record<LabelPlacement, { top?: number; bottom?: number }>> = {
    [LabelPlacement.Top]: {
        top: 0,
    },
    [LabelPlacement.Center]: {
        top: 50,
    },
    [LabelPlacement.Bottom]: {
        bottom: 0,
    },
};

export const verticalLabelPlacementStyleMap: Partial<Record<LabelPlacement, { left?: number; right?: number }>> = {
    [LabelPlacement.Left]: {
        left: 0,
    },
    [LabelPlacement.Center]: {
        left: 50,
    },
    [LabelPlacement.Right]: {
        right: 0,
    },
};

export enum Alignment {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export enum Height {
    Auto = 'auto',
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export const heightMap: Record<Height, number> = {
    [Height.Auto]: 500,
    [Height.Small]: 300,
    [Height.Medium]: 500,
    [Height.Large]: 700,
};

export const heightMapWithPixel: Record<Height, string> = {
    [Height.Auto]: `${heightMap[Height.Medium]}px`,
    [Height.Small]: `${heightMap[Height.Small]}px`,
    [Height.Medium]: `${heightMap[Height.Medium]}px`,
    [Height.Large]: `${heightMap[Height.Large]}px`,
};

export enum Handle {
    Arrows = 'arrows',
    Circles = 'circles',
    None = 'none',
}

export type LabelProps = {
    isEditing: boolean;
    designTokens: Partial<Record<DesignTokenName, TokenValues>>;
    value: string;
    onBlur: (newValue: string) => void;
};

export type HandleProps = {
    handle: Handle;
    sliderColor: Color;
    sliderWidth: string;
    sliderStyle: BorderStyle;
    alignment: Alignment;
};

export type UploadViewProps = {
    alignment: Alignment;
    firstAssetPreviewUrl?: string;
    secondAssetPreviewUrl?: string;
    openAssetChooser: (slot: SliderImageSlot) => void;
    startFileDialogUpload: (slot: SliderImageSlot) => void;
    startDragAndDropUpload: (files: FileList, slot: SliderImageSlot) => void;
    isFirstAssetLoading: boolean;
    isSecondAssetLoading: boolean;
};

export type EditorOverlayProps = {
    alignment: Alignment;
    firstAsset: Asset[];
    secondAsset: Asset[];
    openAssetChooser: (slot: SliderImageSlot) => void;
    startFileDialogUpload: (slot: SliderImageSlot) => void;
    handleAssetDelete: (key: string, id: number) => void;
    borderStyle: CSSProperties;
    renderLabel: (slot: SliderImageSlot) => JSX.Element;
};
