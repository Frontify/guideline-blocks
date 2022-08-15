/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color, ColorPickerProps } from '@frontify/fondue';

export type Props = {
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
    color: string;
    colorSpaces: string[];
    isEditing: boolean;
};

export type ItemAddProps = {
    colorSpaces: string[];
    isEditing: boolean;
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

export type ColorsBlockColorPickerProps = Pick<ColorPickerProps, 'onSelect'> & {
    currentColor?: Color | null;
    children: ReactNode;
};

export type TootlipContentProps = {
    color: string;
    status: 'error' | 'success' | 'idle';
};
