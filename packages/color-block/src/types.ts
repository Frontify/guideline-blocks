/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color, ColorPickerProps } from '@frontify/fondue';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    name?: string;
    description?: string;
    view_type?: string;
    color_spaces?: string[];
};

export type ColorBlockListViewProps = {
    colors: string[];
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
