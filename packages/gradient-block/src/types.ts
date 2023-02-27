/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';

export enum GradientHeight {
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export enum GradientOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type GradientColor = {
    hex: string;
    name: string;
    position: number;
};

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    isOrientationCustom: boolean;
    orientationCustom: number;
    orientationSimple: GradientOrientation;
    displayCss?: boolean;
    content?: string;
    gradientColors?: GradientColor[];
    contentValue?: string;
    gradientOrientation: number;
};

export const gradientHeightValues: Record<GradientHeight, string> = {
    [GradientHeight.Small]: '48px',
    [GradientHeight.Medium]: '72px',
    [GradientHeight.Large]: '96px',
};

export const gradientOrientationValues: Record<GradientOrientation, number> = {
    [GradientOrientation.Vertical]: 0,
    [GradientOrientation.Horizontal]: 90,
};

export type CssValueDisplayProps = {
    cssValue: string;
};

export type SquareBadgeProps = {
    color: GradientColor;
    index: number;
    lastIndex: number;
};

export type ColorPickerProps = {
    editing: boolean;
    color: GradientColor | null;
    currentColor: Color | null;
    currentColorPosition: number | undefined;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentColorPosition: (position?: number) => void;
    setCurrentColor: (color: Color | null) => void;
    setCurrentlyEditingColor: (color?: string | undefined) => void;
};

export type AddColorButtonProps = {
    addButtonPosition: { top: number; left: number };
    setShowColorModal: (show: boolean) => void;
    setCurrentColorPosition: (position?: number) => void;
};

export type EditAndDeleteColorBoxProps = {
    color: GradientColor;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentColor: (color: Color | null) => void;
    setCurrentlyEditingColor: (color: string | undefined) => void;
};

export type ColorTooltipProps = {
    color: GradientColor;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentColor: (color: Color | null) => void;
    setCurrentlyEditingColor: (color: string | undefined) => void;
};
