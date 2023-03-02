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
    color: Color;
    position: number;
    level?: number;
    isLeft?: boolean;
};

export type Settings = {
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: GradientHeight;
    isOrientationCustom: boolean;
    orientationCustom: number;
    orientationSimple: GradientOrientation;
    displayCss?: boolean;
    gradientColors?: GradientColor[];
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

export type SquareBadgesProps = {
    blockWidth: number;
    gradientColors: GradientColor[];
    gradientOrientation: number;
};

export type ColorPickerProps = {
    gradientColors: GradientColor[];
    currentlyEditingPosition: number;
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
};

export type AddColorButtonProps = {
    addButtonPosition: { top: number; left: number };
    blockWidth: number;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
};

export type EditAndDeleteColorBoxProps = {
    color: GradientColor;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
};

export type ColorTooltipProps = {
    gradientColor: GradientColor;
    gradientColors: GradientColor[];
    setColors: (color: GradientColor[]) => void;
    setShowColorModal: (show: boolean) => void;
    setCurrentlyEditingPosition: (value: number) => void;
};
