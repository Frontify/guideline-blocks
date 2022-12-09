/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, ReactChild } from 'react';
import { Color, DraggableItem, DropZonePosition, Palette } from '@frontify/fondue';

export type Settings = {
    customHeight: boolean;
    heightSlider: string;
    heightInput: string;
    colorInput: ColorProps[];
    cypressTest: boolean;
};

export type ColorProps = Color & { id: number; width: number; resized?: boolean };

export type ColorScaleBlockRef = {
    current: Nullable<HTMLDivElement>;
};

export type ColorSquareProps = {
    id: number;
    index: number;
    width: number;
    height: string;
    className: string;
    canDragAndDrop: boolean;
    color: ColorProps;
    isEditing: boolean;
    onDelete: (color: number) => void;
    onDrop: (targetItem: ColorProps, sourceItem: ColorProps, position: DropZonePosition) => void;
    onResizeStart: (event: MouseEvent, id: number, currentColor?: ColorProps) => void;
    currentlyDraggedColorId: Nullable<number> | undefined;
    setCurrentlyDraggedColorId: (value: Nullable<number>) => void;
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

export type DropZoneProps = {
    onDrop?: (targetItem: ColorProps, movedItem: ColorProps, position: DropZonePosition) => void;
    width: number;
    before?: boolean;
    after?: boolean;
    height: number;
    isDraggingActive: boolean;
    data: {
        targetItem: ColorProps;
        position: DropZonePosition;
    };
};

export type ColorPickerFlyoutProps = {
    colorPickerFlyoutPalettes: Palette[];
    isOpen: boolean;
    onClose: () => void;
    onAdd: (color: Color) => void;
    children: ReactChild;
};

export type DragHandleProps = {
    index: number;
    onResizeStart: (event: MouseEvent, id: number, currentColor?: ColorProps) => void;
};

export type EmptyViewProps = {
    height: string;
};
