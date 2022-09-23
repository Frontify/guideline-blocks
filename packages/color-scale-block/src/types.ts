/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent } from 'react';
import { Color, ColorFormat, DraggableItem, DropZonePosition, Palette } from '@frontify/fondue';

export type Settings = {
    customHeight: boolean;
    heightSlider: string;
    heightInput: string;
    ['color-input']: ColorProps[];
};

export type FormattedColor = {
    id?: number | null;
    alpha?: number | undefined | null;
    red?: number | null;
    green?: number | null;
    blue?: number | null;
    name?: string | undefined | null;
};

export type ColorProps = {
    id?: number;
    sort?: number;
    color?: Color;
    width?: number;
    alt?: string;
};

export type ColorPalette = {
    id?: number;
    title?: string;
    source?: string;
    colors?: FormattedColor[];
};

export type ColorScaleBlockRef = {
    current: HTMLDivElement | null;
};

export type SquareWithColorProps = {
    id: number | undefined;
    index: number;
    width: number;
    height: string;
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
    backgroundColorRgba?: string;
    onResizeStart: (event: MouseEvent, index?: number, currentColor?: ColorProps) => void | undefined;
    totalNumberOfBlocks: number;
    isDragging: boolean;
    setCurrentlyDraggedColorId: (value: number | null | undefined) => void;
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
    colors: ColorPalette[];
    editedColor: ColorProps | undefined | null;
    setEditedColor: (color: ColorProps | undefined | null) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
};

export type EditExistingColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    editedColor: ColorProps;
    setEditedColor: (color: ColorProps | undefined | null) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
    colors: Palette[];
};

export type DragHandleProps = {
    index: number;
    currentColor: ColorProps;
    isEditing: boolean;
    onResizeStart?: (event: MouseEvent, id?: number, currentColor?: ColorProps) => void | undefined;
};

export type CustomizationOptionsModalProps = {
    id: number | undefined;
    isEditing: boolean;
    deleteColor: (color: number | undefined) => void;
};
