/* (c) Copyright Frontify Ltd., all rights reserved. */

import { THEME_PREFIX, getReadableColor, isDark, setAlpha } from '@frontify/guideline-blocks-settings';

import { Appearance, Type } from '../types';

const getTextColor = (appearance: Appearance, color: string, backgroundColor: string): string => {
    const isDarkColor = isDark(color, 185);
    const defaultTextColor = isDarkColor ? 'white' : 'black';

    if (appearance === Appearance.Light) {
        return isDarkColor ? color : getReadableColor(color, backgroundColor);
    }

    return defaultTextColor;
};

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

export const computeStyles = (type: Type, appearance: Appearance, hostElement: HTMLDivElement | null) => {
    const accentColor = getAccentColor(type, hostElement);
    const backgroundColor = appearance === Appearance.Strong ? accentColor : setAlpha(0.1, accentColor);
    const textColor = getTextColor(appearance, accentColor, backgroundColor);
    return { backgroundColor, textColor };
};
