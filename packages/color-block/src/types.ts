/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FocusEvent, ReactNode } from 'react';

import { Color, ColorPatch } from '@frontify/app-bridge';
import { Color as ColorFondue } from '@frontify/fondue';

export type Settings = {
    colorPaletteId: number;
    view: ColorBlockType;
    colorspaces: string[];
};

export enum ColorBlockType {
    List = 'list',
    Drops = 'drops',
    Cards = 'cards',
}

export type ItemProps = {
    color: Color;
    colorSpaces: (keyof ColorSpaceValues)[];
    isEditing: boolean;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    onUpdate: (colorPatch: ColorPatch) => void;
    onDelete: (colorId: number) => void;
};

export type ItemAddProps = {
    colorSpaces: (keyof ColorSpaceValues)[];
    onConfirm: (colorPatch: ColorFondue) => void;
};

export type ColorBlockDropsViewProps = {
    colors: string[];
    colorSpaces: (keyof ColorSpaceValues)[];
    isEditing: boolean;
};

export type ColorBlockCardsViewProps = {
    colors: string[];
    colorSpaces: (keyof ColorSpaceValues)[];
    isEditing: boolean;
};

export type ColorPickerFlyoutProps = {
    currentColor?: Nullable<ColorFondue>;
    onConfirm: (colorPatch: ColorFondue) => void;
    children: ReactNode;
};

export type TooltipContentProps = {
    colorName: string;
    colorValue: string;
    status: 'error' | 'success' | 'idle';
};

export type ColorNameProps = {
    viewType: ColorBlockType;
    initialColorName: string;
    isEditing: boolean;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

export type ColorSpaceValues = {
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

export enum ColorSpaceLabels {
    Hex = 'HEX',
    Rgb = 'RGB',
    Less = 'LESS',
    Ral = 'RAL',
    Pms = 'PMS',
    PmsC = 'PMS-C',
    PmsU = 'PMS-U',
    PmsCp = 'PMS-CP',
    PmsPq = 'PMS-PQ',
    PmsTcx = 'PMS-TCX',
    Ora = 'ORA',
    Cmyk = 'CMYK',
    CmykC = 'CMYK-C',
    CmykU = 'CMYK-U',
    CmykN = 'CMYK-N',
    Ncs = 'NCS',
    Hks = 'HKS',
    ThreeM = '3M',
    Lab = 'LAB',
}
