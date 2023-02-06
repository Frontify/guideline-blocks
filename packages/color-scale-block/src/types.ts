/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, Palette } from '@frontify/fondue';
import { Dispatch, MouseEvent, ReactChild, SetStateAction } from 'react';

export type Settings = {
    customHeight: boolean;
    heightSlider: BlockHeight;
    heightInput: string;
    colorInput: ColorProps[];
    cypressTest: boolean;
};

export type ColorProps = Color & { id: number; width: number; resized?: boolean };

export type ColorSquareProps = {
    color: ColorProps;
    totalWidth: number;
    roundedClassNames: string;
    width: number;
    blockId: number;
    isEditing: boolean;
    onDrop: () => void;
    setDisplayableItems: Dispatch<SetStateAction<ColorProps[]>>;
    onDelete: (color: ColorProps) => void;
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

export enum BlockHeight {
    S = 'S',
    M = 'M',
    L = 'L',
}

export const spacingValues: Record<BlockHeight, string> = {
    [BlockHeight.S]: '48px',
    [BlockHeight.M]: '72px',
    [BlockHeight.L]: '96px',
};
