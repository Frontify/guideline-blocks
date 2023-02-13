/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';

export type BlockSettings = unknown;

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

export type AxisProps = {
    minLabel: string;
    maxLabel: string;
};

export type ItemProps = {
    xPosition: number;
    yPosition: number;
    src: string;
    id: number;
};

export type ToolbarProps = {
    draggableAttributes: DraggableAttributes;
    draggableListeners: DraggableSyntheticListeners;
    isDragging: boolean;
};

export type BlockInjectButtonProps = {
    onClick?: () => void;
    isLoading?: boolean;
    label: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    onDrop?: (files: FileList) => void;
    onUploadClick?: () => void;
    onAssetChooseClick?: () => void;
};
