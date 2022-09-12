/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

import { AppBridgeBlock, FrontifyColorPatch } from '@frontify/app-bridge';
import { DraggableItem, DropZonePosition } from '@frontify/fondue';
// import { Color } from '@frontify/fondue';

export type ColorBlockProps = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    name?: string;
    description?: string;
    view?: ColorBlockType;
    colorspaces?: string[];
};

export enum ColorBlockType {
    List = 'list',
    Drops = 'drops',
    Cards = 'cards',
}

export type ItemProps = {
    color: Color & { id: number; hex: Nullable<string> };
    colorSpaces: string[];
    isEditing: boolean;
    onUpdate: (colorPatch: FrontifyColorPatch) => void;
    onDelete: (colorId: number) => void;
};

export type ItemAddProps = {
    colorSpaces: string[];
    isEditing: boolean;
    onConfirm: (color: Color) => void;
};

export type ColorBlockDropsViewProps = {
    colors: string[];
    colorSpaces: string[];
    isEditing: boolean;
};

export type ColorBlockCardsViewProps = {
    colors: string[];
    colorSpaces: string[];
    isEditing: boolean;
};

type Color = {
    r: number;
    g: number;
    b: number;
    a?: number | undefined;
    name?: string | undefined;
};

export type ColorsBlockColorPickerProps = {
    currentColor?: Color | null;
    onConfirm: (colorPatch: FrontifyColorPatch) => void;
    children: ReactNode;
};

export type TooltipContentProps = {
    color: string;
    status: 'error' | 'success' | 'idle';
};
