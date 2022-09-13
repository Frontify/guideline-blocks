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
    onUpdate: (colorPatch: FrontifyColorPatch) => void;
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

export type ColorSpaceInputValues = {
    cmyk_coated: Nullable<string>;
    cmyk_newspaper: Nullable<string>;
    cmyk_uncoated: Nullable<string>;
    hks: Nullable<string>;
    lab: Nullable<string>;
    ncs: Nullable<string>;
    oracal: Nullable<string>;
    pantone_coated: Nullable<string>;
    pantone_cp: Nullable<string>;
    pantone_plastics: Nullable<string>;
    pantone_textile: Nullable<string>;
    pantone_uncoated: Nullable<string>;
    pantone: Nullable<string>;
    ral: Nullable<string>;
    three_m: Nullable<string>;
    variable: Nullable<string>;
};
