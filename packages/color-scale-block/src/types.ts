/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PaddingSettings } from '@frontify/guideline-blocks-shared';
import { Color } from '@frontify/fondue';

export type Settings = PaddingSettings & {
    content: any[];
};

export const DefaultValues: any = {
    content: [],
};

export type ColorProps = {
    color: Color;
    width?: number;
};

export type ColorOptionsModalOpenObject = {
    id?: boolean;
};

export type SquareWithColorProps = {
    id: number;
    width: number;
    currentColor: ColorProps;
    calculateLeftPos: (id: number, width: number) => void;
    hilite: number;
    setHilite: (value: boolean | number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: string | number;
    setEditedColor: (value: string | number) => void;
    updateColor: (color: ColorProps, id: number, appearAfter?: boolean) => void;
    setFormat: (value?: any) => void;
    colorOptionsRef: any;
    colorOptionsOpen: ColorOptionsModalOpenObject;
    setColorOptionsOpen: (value: ColorOptionsModalOpenObject) => void;
    deleteColor: (color: number) => void;
    backgroundColorRgba?: string;
    onDragStart?: (evt: any, id?: number, currentColor?: ColorProps) => void | undefined;
};

export type SquareWithoutColorProps = {
    id: number;
    width: number;
    currentSquare: ColorProps;
    calculateLeftPos: (id: number, width: number) => void;
    hilite: number;
    setHilite: (value: boolean | number) => void;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: string | number;
    setEditedColor: (value: string | number) => void;
    updateColor: (color: ColorProps, id: number, appearAfter?: boolean) => void;
    setFormat: (value?: any) => void;
    colorOptionsRef: any;
    colorOptionsOpen: ColorOptionsModalOpenObject;
    setColorOptionsOpen: (value: ColorOptionsModalOpenObject) => void;
    deleteColor: (color: number) => void;
    hovered: boolean | number;
    setHovered: (value: boolean | number) => void;
    onDragStart?: (evt: any, id?: number, currentColor?: ColorProps) => void | undefined;
};

export type AddNewColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: number | string;
    setEditedColor: (value: number | string | null) => void;
    updateColor: (color: any, id: number, appearAfter?: boolean) => void;
    setFormat: () => void;
};

export type AddNewColorTooltipsProps = {
    id: number;
    isEditing: boolean;
    setEditedColor: (value: string | number) => void;
};

export type EditExistingColorModalProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    colorPickerRef: { current?: any } | undefined;
    editedColor: number | string;
    setEditedColor: (value: string | number | null) => void;
    updateColor: (color: ColorProps, id: number, appearAfter?: boolean) => void;
    setFormat: () => void;
};

export type DragHandleProps = {
    id: number;
    currentColor: ColorProps;
    isEditing: boolean;
    onDragStart?: (evt: any, id?: number, currentColor?: ColorProps) => void | undefined;
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
