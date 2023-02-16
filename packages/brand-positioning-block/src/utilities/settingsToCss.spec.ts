/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Mock, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { borderSettingsToCss, itemStyleSettingssToCss, styleSettingsToCss } from './settingsToCss';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { BrandItemSize } from '../types';

const MOCK_RGBA_COLOR = 'rgba(0, 0, 0, 0.5)';
const BACKGROUND_COLOR = { red: 225, green: 14, blue: 48, alpha: 0.8 };
const BORDER_COLOR = { red: 12, green: 228, blue: 48, alpha: 0.8 };
const MOCK_STYLE_SETTINGS = {
    backgroundColor: BACKGROUND_COLOR,
    borderColor: BORDER_COLOR,
    borderWidth: '1px',
    borderStyle: BorderStyle.Dotted,
    borderRadius: Radius.None,
    hasBorder: true,
    hasCustomRadius: false,
    customBorderRadius: '15px',
};
const RESULT_CSS = {
    backgroundColor: MOCK_RGBA_COLOR,
    border: `1px dotted ${MOCK_RGBA_COLOR}`,
    borderRadius: '0px',
};

vi.mock('@frontify/guideline-blocks-shared', () => ({
    borderStyleMap: {
        ['Solid']: 'solid',
        ['Dotted']: 'dotted',
        ['Dashed']: 'dashed',
    },
    radiusStyleMap: {
        ['None']: '0px',
        ['Small']: '2px',
        ['Medium']: '4px',
        ['Large']: '12px',
    },
    toHex8String: vi.fn(),
    BorderStyle: {
        Solid: 'Solid',
        Dashed: 'Dashed',
        Dotted: 'Dotted',
    },
    Radius: {
        None: 'None',
        Small: 'Small',
        Medium: 'Medium',
        Large: 'Large',
    },
    BrandItemSize: {
        S: 'Small',
        M: 'Medium',
        L: 'Large',
    },
    brandItemSizeMap: {
        S: '40px',
        M: '48px',
        L: '56px',
    },
}));

describe('borderSettingsToCss', () => {
    let toHex8StringMock: Mock<any[], any>;
    beforeEach(async () => {
        const { toHex8String } = await import('@frontify/guideline-blocks-shared');
        vi.mocked(toHex8String).mockReturnValue(MOCK_RGBA_COLOR);
        toHex8StringMock = vi.mocked(toHex8String);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('creates a correct border string', async () => {
        const result = borderSettingsToCss('1px', BorderStyle.Dotted, BORDER_COLOR);
        expect(result).toEqual(`1px dotted ${MOCK_RGBA_COLOR}`);
        expect(toHex8StringMock).toHaveBeenCalledWith(BORDER_COLOR);
    });
});

describe('styleSettingsToCss', () => {
    let toHex8StringMock: Mock<any[], any>;
    beforeEach(async () => {
        const { toHex8String } = await import('@frontify/guideline-blocks-shared');
        vi.mocked(toHex8String).mockReturnValue(MOCK_RGBA_COLOR);
        toHex8StringMock = vi.mocked(toHex8String);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('creates a correct style object', async () => {
        const result = styleSettingsToCss(MOCK_STYLE_SETTINGS);
        expect(toHex8StringMock).toHaveBeenCalledTimes(2);
        expect(toHex8StringMock).toHaveBeenCalledWith(BACKGROUND_COLOR);
        expect(toHex8StringMock).toHaveBeenCalledWith(BORDER_COLOR);
        expect(result).toEqual(RESULT_CSS);
    });

    test('creates a correct style with custom border radius', async () => {
        const result = styleSettingsToCss({
            ...MOCK_STYLE_SETTINGS,
            hasCustomRadius: true,
        });
        expect(toHex8StringMock).toHaveBeenCalledTimes(2);
        expect(toHex8StringMock).toHaveBeenCalledWith(BACKGROUND_COLOR);
        expect(toHex8StringMock).toHaveBeenCalledWith(BORDER_COLOR);
        expect(result).toEqual({
            ...RESULT_CSS,
            borderRadius: '15px',
        });
    });
});

describe('itemStyleSettingsToCss', () => {
    beforeEach(async () => {
        const { toHex8String } = await import('@frontify/guideline-blocks-shared');
        vi.mocked(toHex8String).mockReturnValue(MOCK_RGBA_COLOR);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('creates a correct style object with width and height', async () => {
        const result = itemStyleSettingssToCss({
            ...MOCK_STYLE_SETTINGS,
            itemSizeSimple: BrandItemSize.M,
            itemSizeCustom: '25px',
            isBrandItemSizeCustom: false,
        });

        expect(result).toEqual({
            ...RESULT_CSS,
            width: '48px',
            height: '48px',
        });
    });

    test('creates a correct style object with custom width and height', async () => {
        const result = itemStyleSettingssToCss({
            ...MOCK_STYLE_SETTINGS,
            itemSizeSimple: BrandItemSize.M,
            itemSizeCustom: '25px',
            isBrandItemSizeCustom: true,
        });

        expect(result).toEqual({
            ...RESULT_CSS,
            width: '25px',
            height: '25px',
        });
    });
});
