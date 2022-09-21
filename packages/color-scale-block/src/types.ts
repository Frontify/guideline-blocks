/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent } from 'react';
import { Color, ColorFormat, DraggableItem, DropZonePosition, OrderableListItem, Palette } from '@frontify/fondue';

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

export type SquareWithColorProps = {
    id: number;
    index: number;
    width: number;
    height: string;
    currentColor: ColorProps;
    calculateLeftPosition: (id: number, width: number) => void;
    isEditing: boolean;
    editedColor: ColorProps;
    setEditedColor: (color: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (color?: ColorFormat) => void;
    deleteColor: (color: number) => void;
    handleDrop: (targetItem: OrderableListItem, sourceItem: OrderableListItem, position: DropZonePosition) => void;
    listId: string;
    backgroundColorRgba?: string;
    onResizeStart?: (event: MouseEvent, id?: string | number, currentColor?: ColorProps) => void | undefined;
    totalNumberOfBlocks: number;
    isDragging: boolean;
    setIsDragging: (value: boolean) => void;
};

export type OnDropCallback<T> = (
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition
) => void;

export type DropZoneData<T> = {
    targetItem: DraggableItem<T>;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    isDraggingActive: boolean;
    currentColor: any;
    children?: JSX.Element;
    before?: boolean;
    after?: boolean;
    width: number;
    height: number;
};

export type ColorPickerFlyoutProps = {
    newIndex: number;
    currentColor: ColorProps;
    isEditing: boolean;
    editedColor: ColorProps;
    setEditedColor: (color: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
};

export type EditExistingColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    editedColor: ColorProps;
    setEditedColor: (color: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
    colors: Palette[];
};

export type DragHandleProps = {
    index: number;
    currentColor: ColorProps;
    isEditing: boolean;
    onResizeStart?: (event: MouseEvent, id?: string | number, currentColor?: ColorProps) => void | undefined;
};

export type CustomizationOptionsModalProps = {
    id: number;
    isEditing: boolean;
    deleteColor: (color: number) => void;
};
