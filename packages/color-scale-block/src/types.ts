/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent } from 'react';
import { Color, ColorFormat, DraggableItem, DropZonePosition, OrderableListItem } from '@frontify/fondue';

export type Settings = {
    customHeight: boolean;
    heightSlider: string;
    heightInput: string;
    ['color-input']: ColorProps[];
};

export type ColorProps = {
    id: number;
    sort?: number;
    color: Color;
    width?: number;
    alt?: string;
};

export type SquareWithColorProps = {
    id: number;
    index: number;
    width: number;
    currentColor: ColorProps;
    calculateLeftPosition: (id: number, width: number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: ColorProps;
    setEditedColor: (value: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (value?: ColorFormat) => void;
    colorOptionsRef: any;
    deleteColor: (color: number) => void;
    handleDrop: (targetItem: OrderableListItem, sourceItem: OrderableListItem, position: DropZonePosition) => void;
    listId: any;
    backgroundColorRgba?: string;
    onResizeStart?: (event: MouseEvent, id?: number, currentColor?: ColorProps) => void;
};

export type SquareWithoutColorProps = {
    id?: number;
    sort: number;
    index: number;
    totalNumberOfBlocks: number;
    placeholderColor: string;
    width: number;
    currentSquare: ColorProps;
    calculateLeftPosition: (id: number, width: number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: ColorProps;
    setEditedColor: (value: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (value?: ColorFormat) => void;
    colorOptionsRef: any;
    deleteColor: (color: number) => void;
    onResizeStart?: (event: MouseEvent, id?: number, currentColor?: ColorProps) => void;
    handleDrop: (targetItem: OrderableListItem, sourceItem: OrderableListItem, position: DropZonePosition) => void;
    listId: any;
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

export type AddNewColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: ColorProps;
    setEditedColor: (value: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
};

export type EditExistingColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: ColorProps;
    setEditedColor: (value: ColorProps) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
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
    colorOptionsRef: { current?: any } | undefined;
    deleteColor: (color: number) => void;
};
