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
    colorSpaces: (keyof ColorSpaceInputValues)[];
    isEditing: boolean;
    onBlur: (event: string) => void;
    onUpdate: (colorPatch: FrontifyColorPatch) => void;
    onDelete: (colorId: number) => void;
};

export type ItemAddProps = {
    colorSpaces: (keyof ColorSpaceInputValues)[];
    onConfirm: (colorPatch: Color) => void;
};

export type ColorBlockDropsViewProps = {
    colors: string[];
    colorSpaces: (keyof ColorSpaceInputValues)[];
    isEditing: boolean;
};

export type ColorBlockCardsViewProps = {
    colors: string[];
    colorSpaces: (keyof ColorSpaceInputValues)[];
    isEditing: boolean;
};

export type ColorsBlockColorPickerProps = {
    currentColor?: Nullable<Color>;
    onConfirm: (colorPatch: Color) => void;
    children: ReactNode;
};

export type TooltipContentProps = {
    color: string;
    status: 'error' | 'success' | 'idle';
};

export type ColorSpaceInputValues = {
    hex?: string;
    rgb?: string;
    cmyk?: string;
    cmykCoated: string;
    cmykNewspaper: string;
    cmykUncoated: string;
    hks: string;
    lab: string;
    ncs: string;
    oracal: string;
    pantoneCoated: string;
    pantoneCp: string;
    pantonePlastics: string;
    pantoneTextile: string;
    pantoneUncoated: string;
    pantone: string;
    ral: string;
    threeM: string;
    variable: string;
};
