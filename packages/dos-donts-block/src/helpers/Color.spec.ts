/* (c) Copyright Frontify Ltd., all rights reserved. */

import { rgbStringToRgbObject } from '@frontify/app-bridge';
import { THEME_PREFIX } from '@frontify/guideline-blocks-settings';
import { describe, expect, it, vi } from 'vitest';

import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE, getDefaultDoColor, getDefaultDontColor } from './Color';

vi.mock('@frontify/app-bridge', () => ({
    rgbStringToRgbObject: vi.fn(),
}));

const mockedRgbStringToRgbObject = vi.mocked(rgbStringToRgbObject);

const mockRgbStringToRgbObjectReturnValue = (value: unknown) => {
    mockedRgbStringToRgbObject.mockReturnValue(value as ReturnType<typeof rgbStringToRgbObject>);
};

const createThemeStyle = (propertyName: string, propertyValue: string) => {
    const element = document.createElement('div');
    element.style.setProperty(propertyName, propertyValue);

    return element.style;
};

describe('Color helpers', () => {
    it('has the correct default do color', () => {
        expect(DO_COLOR_DEFAULT_VALUE).toEqual({
            red: 0,
            green: 200,
            blue: 165,
            alpha: 1,
        });
    });

    it('has the correct default dont color', () => {
        expect(DONT_COLOR_DEFAULT_VALUE).toEqual({
            red: 255,
            green: 55,
            blue: 90,
            alpha: 1,
        });
    });

    it('returns the theme do color if it exists', () => {
        const themeColor = {
            red: 1,
            green: 2,
            blue: 3,
            alpha: 1,
        };

        mockRgbStringToRgbObjectReturnValue(themeColor);

        const themeStyle = createThemeStyle(`${THEME_PREFIX}accent-color-tip-color`, 'rgb(1, 2, 3)');

        expect(getDefaultDoColor(themeStyle)).toEqual(themeColor);
        expect(mockedRgbStringToRgbObject).toHaveBeenCalledWith('rgb(1, 2, 3)');
    });

    it('returns the default do color if the theme color does not exist', () => {
        mockRgbStringToRgbObjectReturnValue(undefined);

        const themeStyle = createThemeStyle(`${THEME_PREFIX}accent-color-tip-color`, '');

        expect(getDefaultDoColor(themeStyle)).toEqual(DO_COLOR_DEFAULT_VALUE);
        expect(mockedRgbStringToRgbObject).toHaveBeenCalledWith('');
    });

    it('returns the theme dont color if it exists', () => {
        const themeColor = {
            red: 4,
            green: 5,
            blue: 6,
            alpha: 1,
        };

        mockRgbStringToRgbObjectReturnValue(themeColor);

        const themeStyle = createThemeStyle(`${THEME_PREFIX}accent-color-warning-color`, 'rgb(4, 5, 6)');

        expect(getDefaultDontColor(themeStyle)).toEqual(themeColor);
        expect(mockedRgbStringToRgbObject).toHaveBeenCalledWith('rgb(4, 5, 6)');
    });

    it('returns the default dont color if the theme color does not exist', () => {
        mockRgbStringToRgbObjectReturnValue(undefined);

        const themeStyle = createThemeStyle(`${THEME_PREFIX}accent-color-warning-color`, '');

        expect(getDefaultDontColor(themeStyle)).toEqual(DONT_COLOR_DEFAULT_VALUE);
        expect(mockedRgbStringToRgbObject).toHaveBeenCalledWith('');
    });
});
