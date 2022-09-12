/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

import { AppBridgeBlock, FrontifyColor, FrontifyColorPatch } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

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
    color: FrontifyColor;
    colorSpaces: string[];
    isEditing: boolean;
    onBlur: (value: string) => void;
    onConfirm: (colorPatch: FrontifyColorPatch) => void;
    onDelete: (colorId: number) => void;
};

export type ItemAddProps = {
    colorSpaces: string[];
    isEditing: boolean;
    onConfirm: (colorPatch: FrontifyColorPatch) => void;
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

export type ColorsBlockColorPickerProps = {
    currentColor?: Color;
    onConfirm: (colorPatch: FrontifyColorPatch) => void;
    children: ReactNode;
};

export type TooltipContentProps = {
    color: string;
    status: 'error' | 'success' | 'idle';
};
