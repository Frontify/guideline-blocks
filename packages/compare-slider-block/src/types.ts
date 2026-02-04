/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { type BorderStyle, type Color, type Radius } from '@frontify/guideline-blocks-settings';
import { type CSSProperties, type ReactNode } from 'react';

export const FIRST_ASSET_ID = 'firstAsset';
export const SECOND_ASSET_ID = 'secondAsset';

export type BlockSettings = {
    alignment: Alignment;

    hasCustomHeight: boolean;
    height: Height;
    customHeight: string;

    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderColor: Color | null;
    borderWidth: string;

    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;

    firstAssetLabel: string;
    firstAssetLabelPlacementHorizontal: LabelPlacement;
    firstAssetLabelPlacementVertical: LabelPlacement;
    firstAssetAlt?: string;

    secondAssetLabel: string;
    secondAssetLabelPlacementHorizontal: LabelPlacement;
    secondAssetLabelPlacementVertical: LabelPlacement;
    secondAssetAlt?: string;

    handle: Handle;

    sliderColor: Color | null;
    sliderWidth: string;
    sliderStyle: BorderStyle;

    backgroundColor: Color | null;
    hasBackground: boolean;

    firstAssetHasStrikethrough: boolean;
    secondAssetHasStrikethrough: boolean;

    strikethroughColorSource: InheritSettings;
    customStrikeThroughColor: Color | null;
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
    blockId: string;
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
    firstAssetTitle: string;
    secondAssetPreviewUrl?: string;
    secondAssetTitle: string;
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
    firstAlt?: string;
    secondAlt?: string;
    openAssetChooser: (slot: SliderImageSlot) => void;
    startFileDialogUpload: (slot: SliderImageSlot) => void;
    handleAssetDelete: (key: string, id: number) => void;
    borderStyle: CSSProperties;
    renderLabel: (slot: SliderImageSlot) => JSX.Element;
    updateImageAlt: (key: 'firstAssetAlt' | 'secondAssetAlt', newAlt: string) => void;
};

export type StrikethroughWrapperProps = {
    children: ReactNode;
    alignment: Alignment;
    slot: SliderImageSlot;
    borderRadius: string;
    hasStrikeThrough: boolean;
    currentSliderPosition: number;
};

export type LabelWrapperProps = {
    children: ReactNode;
    slot: SliderImageSlot;
    borderRadius: string;
    alignment: Alignment;
    firstAssetLabelPlacementVertical: LabelPlacement;
    secondAssetLabelPlacementVertical: LabelPlacement;
    secondAssetLabelPlacementHorizontal: LabelPlacement;
    firstAssetLabelPlacementHorizontal: LabelPlacement;
};
