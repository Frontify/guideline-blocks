/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { Asset } from '@frontify/app-bridge';

export type Item = {
    position: { x: number; y: number };
    id: string;
    assetId: number;
};

export type BlockSettings = {
    items: Item[];
};

export const ASSETS_KEY = 'assets';

export enum BrandItemSize {
    S = 's',
    M = 'm',
    L = 'l',
}

export const brandItemBrandItemSizeMap: Record<BrandItemSize, string> = {
    [BrandItemSize.S]: '40px',
    [BrandItemSize.M]: '48px',
    [BrandItemSize.L]: '56px',
};

export enum CornerRadius {
    NONE = 'none',
    S = 's',
    M = 'm',
    L = 'l',
}

export const cornerRadiusMap: Record<CornerRadius, string> = {
    [CornerRadius.NONE]: '0',
    [CornerRadius.S]: '2px',
    [CornerRadius.M]: '4px',
    [CornerRadius.L]: '12px',
};

export type BoardProps = {
    items: Item[];
    assets: Asset[];
    setItems: (items: Item[]) => void;
    deleteItem: (item: Item) => void;
    isEditing: boolean;
};

export type AxisProps = {
    minLabel: string;
    maxLabel: string;
    orientation: 'horizontal' | 'vertical';
};

export type ItemProps = {
    xPosition: number;
    yPosition: number;
    src?: string;
    id: string;
    isEditing: boolean;

    deleteItem: () => void;
};

export type ToolbarProps = {
    draggableAttributes: DraggableAttributes;
    draggableListeners: DraggableSyntheticListeners;
    isDragging: boolean;
    deleteItem: () => void;
};

export type BlockInjectButtonProps = {
    isLoading?: boolean;
    label: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    onDrop: (files: FileList) => void;
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
};
