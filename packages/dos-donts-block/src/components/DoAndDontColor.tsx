/* (c) Copyright Frontify Ltd., all rights reserved. */

import { rgbStringToRgbObject } from '@frontify/app-bridge';
import { THEME_PREFIX } from '@frontify/guideline-blocks-settings';

export const DO_COLOR_DEFAULT_VALUE = { red: 0, green: 200, blue: 165, alpha: 1 };
export const DONT_COLOR_DEFAULT_VALUE = { red: 255, green: 55, blue: 90, alpha: 1 };

export const getDefaultDoColor = (themeStyle: CSSStyleDeclaration) =>
    rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`)) ||
    DO_COLOR_DEFAULT_VALUE;

export const getDefaultDontColor = (themeStyle: CSSStyleDeclaration) =>
    rgbStringToRgbObject(themeStyle.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`)) ||
    DONT_COLOR_DEFAULT_VALUE;
