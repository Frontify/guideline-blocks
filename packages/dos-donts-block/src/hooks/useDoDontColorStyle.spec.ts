/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    DONT_COLOR_DEFAULT_VALUE,
    DO_COLOR_DEFAULT_VALUE,
    getDefaultDoColor,
    getDefaultDontColor,
} from '../helpers/Color';
import { type Settings } from '../types';

import { useDoDontColorStyle } from './useDoDontColorStyle';

vi.mock('../helpers/Color', () => ({
    DO_COLOR_DEFAULT_VALUE: { red: 0, green: 200, blue: 165, alpha: 1 },
    DONT_COLOR_DEFAULT_VALUE: { red: 255, green: 55, blue: 90, alpha: 1 },
    getDefaultDoColor: vi.fn(),
    getDefaultDontColor: vi.fn(),
}));

const mockedGetDefaultDoColor = vi.mocked(getDefaultDoColor);
const mockedGetDefaultDontColor = vi.mocked(getDefaultDontColor);

const createBlockSettings = (overrides: Partial<Settings> = {}): Settings =>
    ({
        hasCustomDoColor: false,
        hasCustomDontColor: false,
        doColor: null,
        dontColor: null,
        ...overrides,
    }) as Settings;

describe('useDoDontColorStyle', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedGetDefaultDoColor.mockReturnValue(DO_COLOR_DEFAULT_VALUE);
        mockedGetDefaultDontColor.mockReturnValue(DONT_COLOR_DEFAULT_VALUE);
    });

    it('returns the default do and dont colors when no custom colors are set', () => {
        const { result } = renderHook(() => useDoDontColorStyle(createBlockSettings()));

        expect(result.current.doColor).toEqual(DO_COLOR_DEFAULT_VALUE);
        expect(result.current.dontColor).toEqual(DONT_COLOR_DEFAULT_VALUE);
        expect(result.current.resolvedDoColor).toEqual(DO_COLOR_DEFAULT_VALUE);
        expect(result.current.resolvedDontColor).toEqual(DONT_COLOR_DEFAULT_VALUE);
    });

    it('returns the custom do color when hasCustomDoColor is true', () => {
        const customDoColor = { red: 10, green: 20, blue: 30, alpha: 1 };

        const { result } = renderHook(() =>
            useDoDontColorStyle(createBlockSettings({ hasCustomDoColor: true, doColor: customDoColor }))
        );

        expect(result.current.doColor).toEqual(customDoColor);
        expect(result.current.resolvedDoColor).toEqual(customDoColor);
    });

    it('returns the custom dont color when hasCustomDontColor is true', () => {
        const customDontColor = { red: 40, green: 50, blue: 60, alpha: 1 };

        const { result } = renderHook(() =>
            useDoDontColorStyle(createBlockSettings({ hasCustomDontColor: true, dontColor: customDontColor }))
        );

        expect(result.current.dontColor).toEqual(customDontColor);
        expect(result.current.resolvedDontColor).toEqual(customDontColor);
    });

    it('falls back to the default value when the custom color is null', () => {
        const { result } = renderHook(() =>
            useDoDontColorStyle(createBlockSettings({ hasCustomDoColor: true, doColor: null }))
        );

        expect(result.current.doColor).toBeNull();
        expect(result.current.resolvedDoColor).toEqual(DO_COLOR_DEFAULT_VALUE);
    });
});
