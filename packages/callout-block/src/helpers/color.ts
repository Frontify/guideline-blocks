/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, THEME_PREFIX, isDark, setAlpha, toColorObject } from '@frontify/guideline-blocks-settings';

import { Appearance, Type } from '../types';

const MIN_READABLE_CONTRAST = 1.5;

const getAccentColor = (type: Type, hostElement: HTMLDivElement | null): string => {
    const style = getComputedStyle(hostElement ?? document.body);
    switch (type) {
        case Type.Info:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-info-color`);
        case Type.Note:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-note-color`);
        case Type.Tip:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`);
        case Type.Warning:
            return style.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`);
    }
};

const getSchemeBackgroundColor = (hostElement: HTMLDivElement | null): string => {
    const style = getComputedStyle(hostElement ?? document.body);
    return style.getPropertyValue(`${THEME_PREFIX}background-color`).trim() || 'rgb(255, 255, 255)';
};

const getEffectiveBackgroundColor = (accentColor: string, schemeBackgroundColor: string): string => {
    const accent = toColorObject(accentColor);
    const scheme = toColorObject(schemeBackgroundColor);
    const blendChannel = (channel: 'red' | 'green' | 'blue') =>
        Math.round(accent[channel] * 0.1 + scheme[channel] * 0.9);
    return `rgb(${blendChannel('red')}, ${blendChannel('green')}, ${blendChannel('blue')})`;
};

const getRelativeLuminance = ({ red, green, blue }: Color): number => {
    const toLinear = (channel: number) => {
        const value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);
};

const getContrastRatio = (firstColor: string, secondColor: string): number => {
    const firstLuminance = getRelativeLuminance(toColorObject(firstColor));
    const secondLuminance = getRelativeLuminance(toColorObject(secondColor));
    const lighter = Math.max(firstLuminance, secondLuminance);
    const darker = Math.min(firstLuminance, secondLuminance);
    return (lighter + 0.05) / (darker + 0.05);
};

const getReadableTextColor = (accentColor: string, backgroundColor: string): string => {
    if (getContrastRatio(accentColor, backgroundColor) >= MIN_READABLE_CONTRAST) {
        return accentColor;
    }

    const whiteContrast = getContrastRatio('rgb(255, 255, 255)', backgroundColor);
    const blackContrast = getContrastRatio('rgb(0, 0, 0)', backgroundColor);
    return whiteContrast > blackContrast ? 'white' : 'black';
};

export const computeStyles = (type: Type, appearance: Appearance, hostElement: HTMLDivElement | null) => {
    const accentColor = getAccentColor(type, hostElement);

    if (appearance === Appearance.Strong) {
        return { backgroundColor: accentColor, textColor: isDark(accentColor, 185) ? 'white' : 'black' };
    }

    const backgroundColor = setAlpha(0.1, accentColor);
    const effectiveBackgroundColor = getEffectiveBackgroundColor(accentColor, getSchemeBackgroundColor(hostElement));
    const textColor = getReadableTextColor(accentColor, effectiveBackgroundColor);

    return { backgroundColor, textColor };
};
