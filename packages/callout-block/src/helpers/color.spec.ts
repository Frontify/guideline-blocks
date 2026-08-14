/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readability } from '@ctrl/tinycolor';
import { THEME_PREFIX, toColorObject } from '@frontify/guideline-blocks-settings';
import { afterEach, describe, expect, it } from 'vitest';

import { Appearance, Type } from '../types';

import { computeStyles, getEffectiveBackgroundColor } from './color';

const WHITE_SCHEME = 'rgb(255, 255, 255)';

/** WCAG AA contrast for normal text — asserted via TinyColor, independent of production's own contrast math. */
const MIN_WCAG_AA_CONTRAST = 4.5;

const createHost = (cssVariables: Record<string, string>): HTMLDivElement => {
    const host = document.createElement('div');
    for (const [name, value] of Object.entries(cssVariables)) {
        host.style.setProperty(name, value);
    }
    document.body.appendChild(host);
    return host;
};

describe('computeStyles', () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

    it('should keep the accent as text color for Light appearance when contrast meets WCAG AA', () => {
        const accent = 'rgb(50, 40, 145)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: WHITE_SCHEME,
        });

        const { textColor } = computeStyles(Type.Note, Appearance.Light, host);

        expect(textColor).toBe(accent);
        expect(readability(textColor, getEffectiveBackgroundColor(accent, WHITE_SCHEME))).toBeGreaterThanOrEqual(
            MIN_WCAG_AA_CONTRAST
        );
    });

    it('should darken the accent for Light appearance when contrast is too low', () => {
        const accent = 'rgb(246, 216, 56)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: WHITE_SCHEME,
        });

        const { textColor } = computeStyles(Type.Note, Appearance.Light, host);
        const effectiveBackground = getEffectiveBackgroundColor(accent, WHITE_SCHEME);
        const text = toColorObject(textColor);
        const accentColor = toColorObject(accent);

        expect(textColor).not.toBe(accent);
        expect(text.red === text.green && text.green === text.blue).toBe(false);
        expect(text.red).toBeLessThan(accentColor.red);
        expect(text.green).toBeLessThan(accentColor.green);
        expect(text.blue).toBeLessThan(accentColor.blue);
        expect(readability(textColor, effectiveBackground)).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });

    it('should lighten toward white for Light appearance on a dark scheme background', () => {
        const accent = 'rgb(0, 0, 0)';
        const scheme = 'rgb(0, 0, 0)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: scheme,
        });

        const { textColor } = computeStyles(Type.Note, Appearance.Light, host);
        const effectiveBackground = getEffectiveBackgroundColor(accent, scheme);
        const { red, green, blue } = toColorObject(textColor);

        expect(textColor).not.toBe(accent);
        expect(red).toBe(green);
        expect(green).toBe(blue);
        expect(red).toBeGreaterThan(0);
        expect(readability(textColor, effectiveBackground)).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });

    it('should use white for Strong appearance on a dark accent', () => {
        const accent = 'rgb(50, 40, 145)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: WHITE_SCHEME,
        });

        const { backgroundColor, textColor } = computeStyles(Type.Note, Appearance.Strong, host);

        expect(backgroundColor.trim()).toBe(accent);
        expect(textColor).toBe('rgb(255, 255, 255)');
        expect(readability(textColor, accent)).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });

    it('should use black for Strong appearance on a light accent', () => {
        const accent = 'rgb(246, 216, 56)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: WHITE_SCHEME,
        });

        const { backgroundColor, textColor } = computeStyles(Type.Note, Appearance.Strong, host);

        expect(backgroundColor.trim()).toBe(accent);
        expect(textColor).toBe('rgb(0, 0, 0)');
        expect(readability(textColor, accent)).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });

    it('should use white for Strong appearance on a pure black background', () => {
        const accent = 'rgb(0, 0, 0)';
        const host = createHost({
            [`${THEME_PREFIX}accent-color-note-color`]: accent,
            [`${THEME_PREFIX}background-color`]: WHITE_SCHEME,
        });

        const { textColor } = computeStyles(Type.Note, Appearance.Strong, host);

        expect(textColor).toBe('rgb(255, 255, 255)');
        expect(readability(textColor, accent)).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });
});
