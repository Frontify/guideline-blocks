/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from '@frontify/fondue';

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
    thickness?: string;
};

export enum DividerStyle {
    NoLine = 'NoLine',
    Dashed = 'Dashed',
    Solid = 'Solid',
    Dotted = 'Dotted',
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

export const dividerHeightValues: Record<DividerHeight, string> = {
    [DividerHeight.Small]: '36px',
    [DividerHeight.Medium]: '60px',
    [DividerHeight.Large]: '96px',
};

export const dividerStyleClasses: Record<DividerStyle, string> = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

export const dividerAlignmentClasses: Record<DividerAlignment, string> = {
    [DividerAlignment.Center]: 'tw-justify-center',
    [DividerAlignment.Right]: 'tw-justify-end',
    [DividerAlignment.Left]: 'tw-justify-start',
};
