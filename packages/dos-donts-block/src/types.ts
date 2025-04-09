/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';

export type Settings = {
    mode: BlockMode;

    style: DoDontStyle;

    doIconChoice: ItemIconChoice;

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
    doColor: Color | null;
    dontColor: Color | null;

    hasBorder: boolean;
    borderWidth: string;
    borderStyle: BorderStyle;
    borderColor: Color | null;

    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;

    hasBackground: boolean;
    backgroundColor: Color | null;

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
    onChangeItem: (id: string, change: Partial<Record<ChangeType, ValueType>>) => void;
    onChangeLocalItem: (id: string, value: ValueType, type: ChangeType) => void;
    title?: string;
    body?: string;
    editing: boolean;
    onRemoveSelf: (itemId: string) => void;
    doIconChoice: ItemIconChoice;
    dontIconChoice: ItemIconChoice;
    mode: BlockMode;
    linkedImage?: Asset;
    appBridge: AppBridgeBlock;
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
    alt?: string;
    addAssetIdsToKey?: (key: string, newAssetIds: number[]) => Promise<void>;
};

export type DoDontItemProps = SortableDoDontItemProps & {
    isDragging?: boolean;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
    setActivatorNodeRef?: (node: HTMLElement | null) => void;
};

export type ItemToolbarProps = {
    id: string;
    onRemoveSelf: () => void;
    draggableProps: Record<string, unknown>;
    isFlyoutOpen: boolean;
    setIsFlyoutOpen: (x: boolean) => void;
    type: DoDontType;
    isDragging: boolean;
    onChangeItem: (id: string, value: ValueType, type: ChangeType) => void;
    onAssetChooseClick: (() => void) | undefined;
    onUploadClick: (() => void) | undefined;
};

export type IconComponentProps = {
    doIconChoice: ItemIconChoice;
    dontIconChoice: ItemIconChoice;
    type: DoDontType;
};

export type ImageComponentProps = {
    id: string;
    image?: Asset;
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
    alt?: string;
};

export type Item = {
    id: string;
    title: string;
    body: string;
    type: DoDontType;
    imageId?: number;
    alt?: string;
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

export type ChangeType = 'title' | 'body' | 'type' | 'imageId' | 'alt';

export type ValueType = string | number | undefined;
