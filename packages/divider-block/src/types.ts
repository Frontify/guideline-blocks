/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    alignment?: DividerAlignment;
    style?: DividerStyle;
    isLine?: DividerStyle;
    color?: Color;
    isWidthCustom?: boolean;
    widthCustom?: string;
    widthSimple?: DividerWidth;
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: DividerHeight;
    isThicknessCustom?: boolean;
    thicknessCustom?: string;
    thicknessSimple?: DividerThickness;
};

export enum DividerStyle {
    NoLine = 'noline',
    Dashed = 'dashed',
    Solid = 'solid',
    Dotted = 'dotted',
}

export enum DividerHeight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum DividerWidth {
    '10%' = '10%',
    '25%' = '25%',
    '50%' = '50%',
    '100%' = '100%',
}

export enum DividerAlignment {
    Center = 'Center',
    Right = 'Right',
    Left = 'Left',
}

export enum DividerThickness {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const dividerHeightMap: Record<DividerHeight, string> = {
    [DividerHeight.Small]: '36px',
    [DividerHeight.Medium]: '60px',
    [DividerHeight.Large]: '96px',
};

export const dividerStyleMap: Record<DividerStyle, string> = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

export const dividerAlignmentMap: Record<DividerAlignment, string> = {
    [DividerAlignment.Center]: 'tw-justify-center',
    [DividerAlignment.Right]: 'tw-justify-end',
    [DividerAlignment.Left]: 'tw-justify-start',
};

export const dividerThicknessMap: Record<DividerThickness, string> = {
    [DividerThickness.Small]: '1px',
    [DividerThickness.Medium]: '2px',
    [DividerThickness.Large]: '4px',
};
