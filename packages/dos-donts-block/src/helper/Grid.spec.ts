/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getGridClassName } from './Grid';

describe('getGridClassName', () => {
    it('returns the default responsive grid class when no values are passed', () => {
        expect(getGridClassName()).toBe('@sm:tw-grid-cols-2');
    });

    it('returns one column class', () => {
        expect(getGridClassName(false, 1)).toBe('tw-grid-cols-1');
    });

    it('returns two column responsive class', () => {
        expect(getGridClassName(false, 2)).toBe('@sm:tw-grid-cols-2');
    });

    it('returns three column responsive class', () => {
        expect(getGridClassName(false, 3)).toBe('@md:tw-grid-cols-3 @sm:tw-grid-cols-2');
    });

    it('returns four column responsive class', () => {
        expect(getGridClassName(false, 4)).toBe('@md:tw-grid-cols-4 @sm:tw-grid-cols-3 @xs:tw-grid-cols-2');
    });

    it('returns side by side class when keepSideBySide is true and columns is 2', () => {
        expect(getGridClassName(true, 2)).toBe('tw-grid-cols-2');
    });

    it('does not return side by side class when keepSideBySide is true but columns is not 2', () => {
        expect(getGridClassName(true, 3)).toBe('@md:tw-grid-cols-3 @sm:tw-grid-cols-2');
    });

    it('supports columns as string', () => {
        expect(getGridClassName(false, '4')).toBe('@md:tw-grid-cols-4 @sm:tw-grid-cols-3 @xs:tw-grid-cols-2');
    });

    it('uses the default columns value when columns is undefined', () => {
        expect(getGridClassName(false, undefined)).toBe('@sm:tw-grid-cols-2');
    });
});
