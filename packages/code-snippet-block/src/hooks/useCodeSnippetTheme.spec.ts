/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import * as themes from '@uiw/codemirror-themes-all';
import { describe, expect, it } from 'vitest';

import { headerThemes } from '../headerThemes';
import { type Theme } from '../types';

import { useCodeSnippetTheme } from './useCodeSnippetTheme';

const codeMirrorThemes = (Object.keys(headerThemes) as Theme[]).filter((theme) => theme !== 'default');

const renderCodeSnippetTheme = (theme: Theme) =>
    renderHook(({ theme }: { theme: Theme }) => useCodeSnippetTheme(theme), { initialProps: { theme } });

describe('useCodeSnippetTheme', () => {
    it('should fall back to the light editor theme for the default theme', () => {
        const { result } = renderCodeSnippetTheme('default');

        expect(result.current.editorTheme).toBe('light');
    });

    it.each(codeMirrorThemes)('should return the CodeMirror editor theme for %s', (theme) => {
        const { result } = renderCodeSnippetTheme(theme);

        expect(result.current.editorTheme).toBe(themes[theme]);
    });

    it('should return the header style of the selected theme', () => {
        const { result } = renderCodeSnippetTheme('dracula');

        expect(result.current.headerStyle).toEqual({ backgroundColor: '#282a36', color: '#f8f8f2' });
    });

    it('should paint the header button in the foreground of the selected theme', () => {
        const { result } = renderCodeSnippetTheme('dracula');

        expect(result.current.headerButtonStyle).toEqual({ backgroundColor: '#282a36', color: '#f8f8f2' });
    });

    it('should return the header style of the default theme', () => {
        const { result } = renderCodeSnippetTheme('default');

        expect(result.current.headerStyle).toEqual({ backgroundColor: '#f5f5f5', color: '#6c6c6c' });
    });

    it('should paint the header button black when the default theme is selected', () => {
        const { result } = renderCodeSnippetTheme('default');

        expect(result.current.headerButtonStyle).toEqual({ backgroundColor: '#f5f5f5', color: '#000000' });
    });

    it('should expose the default header colors as custom properties for the select', () => {
        const { result } = renderCodeSnippetTheme('default');

        expect(result.current.headerSelectStyle).toEqual({
            '--base-color': '#f5f5f5',
            '--text-color': '#6c6c6c',
            '--line-color-xx-strong': 'rgba(108, 108, 108, 0.8)',
        });
    });

    it('should expose the header colors as custom properties for the select', () => {
        const { result } = renderCodeSnippetTheme('dracula');

        expect(result.current.headerSelectStyle).toEqual({
            '--base-color': '#282a36',
            '--text-color': '#f8f8f2',
            '--line-color-xx-strong': 'rgba(248, 248, 242, 0.8)',
        });
    });

    it('should keep the header style separate from the shared theme definition', () => {
        const { result } = renderCodeSnippetTheme('dracula');

        expect(result.current.headerButtonStyle).not.toBe(headerThemes.dracula);
    });

    it('should return the same object as long as the theme does not change', () => {
        const { result, rerender } = renderCodeSnippetTheme('dracula');
        const initialResult = result.current;

        rerender({ theme: 'dracula' });

        expect(result.current).toBe(initialResult);
    });

    it('should recompute the styles when the theme changes', () => {
        const { result, rerender } = renderCodeSnippetTheme('dracula');

        rerender({ theme: 'githubDark' });

        expect(result.current.editorTheme).toBe(themes.githubDark);
        expect(result.current.headerStyle).toEqual({ backgroundColor: '#0d1117', color: '#c9d1d9' });
        expect(result.current.headerButtonStyle).toEqual({ backgroundColor: '#0d1117', color: '#c9d1d9' });
        expect(result.current.headerSelectStyle).toEqual({
            '--base-color': '#0d1117',
            '--text-color': '#c9d1d9',
            '--line-color-xx-strong': 'rgba(201, 209, 217, 0.8)',
        });
    });
});
