/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, ReactChild } from 'react';
import { Color, ColorFormat, DraggableItem, DropZonePosition, Palette } from '@frontify/fondue';

export const DefaultValues = {
    startingColor: { red: 85, green: 102, blue: 255 },
};

export type Settings = {
    customHeight: boolean;
    heightSlider: string;
    heightInput: string;
    colorInput: ColorBlockColor[];
};

export type ColorBlockColor = {
    id: number | undefined;
    sort?: number;
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
    width?: number;
    alt?: string;
};

export type ColorScaleBlockRef = {
    current: HTMLDivElement | null;
};

export type SquareWithColorProps = {
    id: number | undefined;
    index: number;
    width: number;
    height: string;
    isLast: boolean;
    isFirst: boolean;
    currentColor: ColorBlockColor;
    calculateLeftPosition: (index: number, width: number) => void;
    isEditing: boolean;
    editedColor: ColorBlockColor | null | undefined;
    setEditedColor: (color: ColorBlockColor | undefined | null) => void;
    updateColor: (color: ColorBlockColor) => void;
    setFormat: (color?: ColorFormat) => void;
    deleteColor: (color: number | undefined) => void;
    handleDrop: (targetItem: ColorBlockColor, sourceItem: ColorBlockColor, position: DropZonePosition) => void;
    listId: string;
    onResizeStart: (event: MouseEvent, index?: number, currentColor?: ColorBlockColor) => void;
    totalNumberOfBlocks: number;
    isDragging: boolean;
    setCurrentlyDraggedColorId: (value: number | undefined | null) => void;
};

export type OnDropCallback<T> = (
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition
) => void;

export type DropZoneData<T> = {
    targetItem: DraggableItem<T> | ColorBlockColor;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    isDraggingActive: boolean;
    currentColor: ColorBlockColor;
    children?: JSX.Element;
    before?: boolean;
    after?: boolean;
    width: number;
    height: number;
};

export type ColorPickerFlyoutProps = {
    newIndex: number;
    isColorPickerOpen: boolean;
    setIsColorPickerOpen: (isOpen: boolean) => void;
    colorPalettes: Palette[];
    updateColor: (color: Color) => void;
    children: ReactChild;
};

export type DragHandleProps = {
    index: number;
    currentColor: ColorBlockColor;
    onResizeStart?: (event: MouseEvent, id?: number, currentColor?: ColorBlockColor) => void | undefined;
};

export type EmptyViewProps = {
    height: string;
};
