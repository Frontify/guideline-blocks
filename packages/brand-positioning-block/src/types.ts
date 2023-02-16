/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { Asset } from '@frontify/app-bridge';

export type Item = {
    position: { x: number; y: number };
    id: string;
    assetId: number;
};

export const ASSETS_KEY = 'assets';

export enum BrandItemSize {
    S = 'small',
    M = 'medium',
    L = 'large',
}

export const brandItemSizeMap: Record<BrandItemSize, string> = {
    [BrandItemSize.S]: '40px',
    [BrandItemSize.M]: '48px',
    [BrandItemSize.L]: '56px',
};

export type BrandPositioningBlockSettings = {
    axisColor: Color;
    boardAxisLabelsColor: Color;
    boardAxisLinesStyle: BorderStyle;
    boardAxisLinesWidth: string;
    boardBackgroundColor: Color;
    borderColor_boardBorder: Color;
    borderColor_brandItemBorder: Color;
    borderStyle_boardBorder: BorderStyle;
    borderStyle_brandItemBorder: BorderStyle;
    borderWidth_boardBorder: string;
    borderWidth_brandItemBorder: string;
    brandItemBackground: Color;
    brandItemSizeSimple: BrandItemSize;
    brandItemSizeCustom: string;
    hasBorder_boardBorder: boolean;
    hasBorder_brandItemBorder: boolean;
    hasRadius_boardCornerRadius: boolean;
    hasRadius_brandItemCornerRadius: boolean;
    isBrandItemSizeCustom: boolean;
    items: Item[];
    radiusChoice_boardCornerRadius: Radius;
    radiusChoice_brandItemCornerRadius: Radius;
    radiusValue_boardCornerRadius: string;
    radiusValue_brandItemCornerRadius: string;
    xAxisLeftLabel: string;
    xAxisRightLabel: string;
    yAxisBottomLabel: string;
    yAxisTopLabel: string;
};

type AxisStyleSettings = {
    lineColor: Color;
    labelsColor: Color;
    lineStyle: BorderStyle;
    lineWidth: string;
};

export type BoardProps = {
    items: Item[];
    assets: Asset[];
    setItems: (items: Item[]) => void;
    deleteItem: (item: Item) => void;
    isEditing: boolean;
    blockSettings: BrandPositioningBlockSettings;
};

export type AxisProps = {
    minLabel: string;
    maxLabel: string;
    orientation: 'horizontal' | 'vertical';
    style: AxisStyleSettings;
};

export type StyleSettings = {
    backgroundColor: Color;
    borderColor: Color;
    borderStyle: BorderStyle;
    borderWidth: string;
    hasBorder: boolean;
    borderRadius: Radius;
    customBorderRadius: string;
    hasCustomRadius: boolean;
};

export type ItemStyleSettings = StyleSettings & {
    itemSizeSimple: BrandItemSize;
    itemSizeCustom: string;
    isBrandItemSizeCustom: boolean;
};

export type ItemProps = {
    xPosition: number;
    yPosition: number;
    src?: string;
    id: string;
    isEditing: boolean;
    deleteItem: () => void;
    style: ItemStyleSettings;
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

export type BlockSettingsByArea = {
    axisStyle: AxisStyleSettings;
    boardStyle: StyleSettings;
    itemStyle: ItemStyleSettings;
};
