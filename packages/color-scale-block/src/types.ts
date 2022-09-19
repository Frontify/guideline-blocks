/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PaddingSettings } from '@frontify/guideline-blocks-shared';
import { Color, DropZonePosition, OrderableListItem } from '@frontify/fondue';


export type Settings = PaddingSettings & {
    content: any[];
};

export const DefaultValues: any = {
    content: [],
};

export type ColorProps = {
    id: string;
    sort?: number;
    color: Color;
    width?: number;
    alt?: string;
};


export type ColorOptionsModalOpenObject = {
    id?: boolean | number;
};

export type SquareWithColorProps = {
    id: number;
    sort: number;
    index: number;
    width: number;
    currentColor: ColorProps;
    calculateLeftPosition: (id: number, width: number) => void;
    highlight: number;
    setHighlight: (value: boolean | number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: string | number;
    setEditedColor: (value: string | number) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (value?: any) => void;
    colorOptionsRef: any;
    colorOptionsOpen: ColorOptionsModalOpenObject;
    setColorOptionsOpen: (value: ColorOptionsModalOpenObject) => void;
    deleteColor: (color: number) => void;
    handleDrop: (targetItem: OrderableListItem, sourceItem: OrderableListItem, position: DropZonePosition) => void;
    listId: any;
    backgroundColorRgba?: string;
    onResizeStart?: (evt: any, id?: number, currentColor?: ColorProps) => void | undefined;
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
    highlight: number;
    setHighlight: (value: boolean | number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: string | number;
    setEditedColor: (value: string | number) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: (value?: any) => void;
    colorOptionsRef: any;
    colorOptionsOpen: ColorOptionsModalOpenObject;
    setColorOptionsOpen: (value: ColorOptionsModalOpenObject) => void;
    deleteColor: (color: number) => void;
    hovered: boolean | number;
    setHovered: (value: boolean | number) => void;
    onResizeStart?: (evt: any, id?: number, currentColor?: ColorProps) => void | undefined;
    handleDrop: (targetItem: OrderableListItem, sourceItem: OrderableListItem, position: DropZonePosition) => void;
    listId: any;
};

export type AddNewColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: number;
    setEditedColor: (value: number | null) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
};

export type EditExistingColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: number;
    setEditedColor: (value: string | number | null) => void;
    updateColor: (color: ColorProps) => void;
    setFormat: () => void;
};

export type DragHandleProps = {
    index: number;
    currentColor: ColorProps;
    isEditing: boolean;
    onResizeStart?: (evt: any, id?: string | number, currentColor?: ColorProps) => void | undefined;
};

export type CustomizationOptionsModalProps = {
    id: number;
    isEditing: boolean;
    colorOptionsRef: { current?: any } | undefined;
    colorOptionsOpen: ColorOptionsModalOpenObject;
    setColorOptionsOpen: (value: ColorOptionsModalOpenObject) => void;
    setEditedColor: (color: string | number) => void;
    deleteColor: (color: number) => void;
};
