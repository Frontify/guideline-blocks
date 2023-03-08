/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import React from 'react';

export type Settings = {
    mode: BlockMode;

    style: DoDontStyle;

    hasCustomDoIcon: boolean;
    doIconChoice: ItemIconChoice;

    hasCustomDontIcon: boolean;
    dontIconChoice: ItemIconChoice;

    hasStrikethrough: boolean;

    columns: number;
    keepSideBySide: boolean;

    isCustomColumnGutter: boolean;
    customColumnGutterValue: string;
    columnGutterChoice: DoDontSpacing;

    isCustomRowGutter: boolean;
    customRowGutterValue: string;
    rowGutterChoice: DoDontSpacing;

    isCustomImageHeight: boolean;
    customImageHeightValue: string;
    imageHeightChoice: DoDontImageHeight;
    imageDisplay: ImageFitChoice;

    hasCustomDoColor: boolean;
    hasCustomDontColor: boolean;
    doColor: Color;
    dontColor: Color;

    hasBorder: boolean;
    borderWidth: string;
    borderStyle: BorderStyle;
    borderColor: Color;

    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;

    hasBackground: boolean;
    backgroundColor: Color;

    items: Item[];
};

export enum BlockMode {
    TEXT = 'text',
    TEXT_AND_IMAGE = 'text_and_image',
}

export enum ItemIconChoice {
    CHECKMARK = 'checkmark',
    CHECKMARK_CIRCLE = 'checkmarkCircle',
    CROSS = 'cross',
    CROSS_CIRCLE = 'crossCircle',
}

export enum ImageFitChoice {
    FIT = 'fit',
    FILL = 'fill',
}

export type SortableDoDontItemProps = {
    id: string;
    type: DoDontType;
    style: DoDontStyle;
    doColor: Color;
    dontColor: Color;
    onChangeItem: (id: string, value: string | number | undefined, type: 'title' | 'body' | 'type' | 'imageId') => void;
    title?: string;
    body?: string;
    editing: boolean;
    onRemoveSelf: () => void;
    hasCustomDoIcon: boolean;
    doIconChoice: ItemIconChoice;
    hasCustomDontIcon: boolean;
    dontIconChoice: ItemIconChoice;
    doIconAsset: Asset[] | undefined;
    dontIconAsset: Asset[] | undefined;
    mode: BlockMode;
    columns: number;
    linkedImage?: string;
    appBridge: AppBridgeBlock;
    minRowHeight: number;
    isCustomImageHeight: boolean;
    customImageHeightValue: string;
    imageDisplay: ImageFitChoice;
    imageHeightChoice: DoDontImageHeight;
    hasStrikethrough: boolean;
    hasBorder: boolean;
    borderWidth: string;
    borderStyle: BorderStyle;
    borderColor: Color;
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
    hasBackground: boolean;
    backgroundColor: Color;
    designTokens: Record<string, React.CSSProperties>;
};

export type DoDontItemProps = SortableDoDontItemProps & {
    isDragging?: boolean;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
};

export type ItemToolbarProps = {
    id: string;
    onRemoveSelf: () => void;
    draggableProps: Record<string, unknown>;
    isFlyoutOpen: boolean;
    setIsFlyoutOpen: (x: boolean) => void;
    type: DoDontType;
    isDragging: boolean;
    onChangeItem: (id: string, value: string | number | undefined, type: 'title' | 'body' | 'type' | 'imageId') => void;
    onAssetChooseClick: (() => void) | undefined;
    onUploadClick: (() => void) | undefined;
};

export type IconComponentProps = {
    hasCustomDoIcon: boolean;
    doIconChoice: ItemIconChoice;
    doIconAsset: Asset[] | undefined;
    hasCustomDontIcon: boolean;
    dontIconChoice: ItemIconChoice;
    dontIconAsset: Asset[] | undefined;
    type: DoDontType;
};

export type ImageComponentProps = {
    id: string;
    src?: string;
    columns: number;
    onAssetChooseClick: () => void;
    onUploadClick: () => void;
    isUploadLoading: boolean;
    isEditing: boolean;
    isCustomImageHeight: boolean;
    customImageHeightValue: string;
    imageDisplay: ImageFitChoice;
    imageHeightChoice: DoDontImageHeight;
    hasStrikethrough: boolean;
    draggableProps?: Record<string, unknown>;
    isDragging: boolean;
    border: string;
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
    hasBackground: boolean;
    backgroundColor: Color;
    dontColor: Color;
};

export type Item = {
    id: string;
    title: string;
    body: string;
    type: DoDontType;
    imageId?: number;
};

export type EditorElement = {
    children: EditorChild[];
};

export type EditorChild = {
    text: string;
};

export enum DoDontType {
    Do = 'Do',
    Dont = 'Dont',
}

export enum DoDontStyle {
    Icons = 'icon',
    Underline = 'underline',
    Text = 'text',
}

export enum DoDontSpacing {
    Auto = 'Auto',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum DoDontImageHeight {
    Auto = 'Auto',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const GUTTER_VALUES: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Auto]: 'normal',
    [DoDontSpacing.Small]: '10px',
    [DoDontSpacing.Medium]: '30px',
    [DoDontSpacing.Large]: '50px',
};

export const IMAGE_HEIGHT_VALUES: Record<DoDontImageHeight, string> = {
    [DoDontImageHeight.Auto]: 'auto',
    [DoDontImageHeight.Small]: '120px',
    [DoDontImageHeight.Medium]: '200px',
    [DoDontImageHeight.Large]: '300px',
};

export const columnsClasses: Record<number, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-2',
    3: 'tw-grid-cols-3',
    4: 'tw-grid-cols-4',
};
