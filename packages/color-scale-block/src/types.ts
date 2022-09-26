/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, ReactChild } from 'react';
import { Color, ColorFormat, DraggableItem, DropZonePosition, Palette } from '@frontify/fondue';

export const DefaultValues = {
    startingColor: { red: 85, green: 102, blue: 255 },
};

export type Settings = {
    customHeight?: boolean;
    heightSlider?: string;
    heightInput?: string;
    colorInput?: BlockColor[];
};

export type BlockColor = {
    id: number;
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
    current: Nullable<HTMLDivElement>;
};

export type SquareWithColorProps = {
    index: number;
    width: number;
    height: string;
    isLast: boolean;
    isFirst: boolean;
    currentColor: BlockColor;
    calculateLeftPosition: (index: number, width: number) => void;
    isEditing: boolean;
    editedColor: BlockColor | null | undefined;
    setEditedColor: (color: BlockColor | undefined | null) => void;
    updateColor: (color: BlockColor) => void;
    setFormat: (color?: ColorFormat) => void;
    deleteColor: (color: number) => void;
    handleDrop: (targetItem: BlockColor, sourceItem: BlockColor, position: DropZonePosition) => void;
    listId: string;
    onResizeStart: (event: MouseEvent, index?: number, currentColor?: BlockColor) => void;
    totalNumberOfBlocks: number;
    isDragging: boolean;
    setCurrentlyDraggedColorId: (value: number | null) => void;
};

export type OnDropCallback<T> = (
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition
) => void;

export type DropZoneData<T> = {
    targetItem: DraggableItem<T> | BlockColor;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    isDraggingActive: boolean;
    currentColor: BlockColor;
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
    currentColor: BlockColor;
    onResizeStart: (event: MouseEvent, id?: number, currentColor?: BlockColor) => void;
};

export type EmptyViewProps = {
    height: string;
};
