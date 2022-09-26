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
    colorInput: ColorProps[];
};

export type ColorProps = {
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
    currentColor: ColorProps;
    calculateLeftPosition: (index: number, width: number) => void;
    isEditing: boolean;
    editedColor: ColorProps | null | undefined;
    setEditedColor: (color: ColorProps | undefined | null) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (color?: ColorFormat) => void;
    deleteColor: (color: number | undefined) => void;
    handleDrop: (targetItem: ColorProps, sourceItem: ColorProps, position: DropZonePosition) => void;
    listId: string;
    onResizeStart: (event: MouseEvent, index?: number, currentColor?: ColorProps) => void;
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
    targetItem: DraggableItem<T> | ColorProps;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    isDraggingActive: boolean;
    currentColor: ColorProps;
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
    currentColor: Color;
    updateColor: (color: Color) => void;
    children: ReactChild;
};

export type DragHandleProps = {
    index: number;
    currentColor: ColorProps;
    onResizeStart?: (event: MouseEvent, id?: number, currentColor?: ColorProps) => void | undefined;
};

export type EmptyViewProps = {
    height: string;
};
