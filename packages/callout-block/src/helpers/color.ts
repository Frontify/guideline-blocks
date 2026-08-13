/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, THEME_PREFIX, setAlpha, toColorObject } from '@frontify/guideline-blocks-settings';

import { Appearance, Type } from '../types';

/** WCAG AA contrast ratio for normal text */
const MIN_READABLE_CONTRAST = 4.5;

const WHITE = 'rgb(255, 255, 255)';
const BLACK = 'rgb(0, 0, 0)';

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
    return style.getPropertyValue(`${THEME_PREFIX}background-color`).trim() || WHITE;
};

export const getEffectiveBackgroundColor = (accentColor: string, schemeBackgroundColor: string): string => {
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

const isDarkBackground = (backgroundColor: string): boolean =>
    getContrastRatio(WHITE, backgroundColor) > getContrastRatio(BLACK, backgroundColor);

const toRgbString = ({ red, green, blue }: Pick<Color, 'red' | 'green' | 'blue'>): string =>
    `rgb(${red}, ${green}, ${blue})`;

const mixColors = (from: Color, to: Color, amount: number): string => {
    const mixChannel = (channel: 'red' | 'green' | 'blue') =>
        Math.round(from[channel] + (to[channel] - from[channel]) * amount);
    return toRgbString({ red: mixChannel('red'), green: mixChannel('green'), blue: mixChannel('blue') });
};

/**
 * Mix `from` toward `to` with the smallest amount that still meets WCAG AA against the background.
 * Callers pass a `to` pole that already meets AA (white/black via isDarkBackground).
 */
const mixUntilContrast = (from: string, to: string, backgroundColor: string): string => {
    if (getContrastRatio(from, backgroundColor) >= MIN_READABLE_CONTRAST) {
        return from;
    }

    const fromColor = toColorObject(from);
    const toColor = toColorObject(to);
    let low = 0;
    let high = 1000;
    let best = to;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const candidate = mixColors(fromColor, toColor, mid / 1000);
        if (getContrastRatio(candidate, backgroundColor) >= MIN_READABLE_CONTRAST) {
            best = candidate;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return best;
};

/** Strong appearance: white on dark backgrounds, black on light ones. */
const getStrongTextColor = (backgroundColor: string): string => (isDarkBackground(backgroundColor) ? WHITE : BLACK);

/** Light appearance: keep the accent when it meets AA, otherwise mix toward black/white. */
const getLightTextColor = (accentColor: string, backgroundColor: string): string =>
    mixUntilContrast(accentColor, isDarkBackground(backgroundColor) ? WHITE : BLACK, backgroundColor);

export const computeStyles = (type: Type, appearance: Appearance, hostElement: HTMLDivElement | null) => {
    const accentColor = getAccentColor(type, hostElement);

    if (appearance === Appearance.Strong) {
        return { backgroundColor: accentColor, textColor: getStrongTextColor(accentColor) };
    }

    const backgroundColor = setAlpha(0.1, accentColor);
    const effectiveBackgroundColor = getEffectiveBackgroundColor(accentColor, getSchemeBackgroundColor(hostElement));
    const textColor = getLightTextColor(accentColor, effectiveBackgroundColor);

    return { backgroundColor, textColor };
};
