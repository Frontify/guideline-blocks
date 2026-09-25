/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type Language, type Theme } from '../types';

import { useCodeMirrorExtensions } from './useCodeMirrorExtensions';

const renderCodeMirrorExtensions = (language: Language, theme: Theme = 'default') =>
    renderHook(
        ({ language, theme }: { language: Language; theme: Theme }) => useCodeMirrorExtensions(language, theme),
        { initialProps: { language, theme } }
    );

describe('useCodeMirrorExtensions', () => {
    it('should add a language extension for a supported language', () => {
        const { result } = renderCodeMirrorExtensions('javascript');

        expect(result.current).toHaveLength(2);
    });

    it('should not add a language extension for plain text', () => {
        const { result } = renderCodeMirrorExtensions('plain');

        expect(result.current).toHaveLength(1);
    });

    it('should return the same extensions as long as language and theme do not change', () => {
        const { result, rerender } = renderCodeMirrorExtensions('javascript', 'dracula');
        const initialResult = result.current;

        rerender({ language: 'javascript', theme: 'dracula' });

        expect(result.current).toBe(initialResult);
    });

    it('should recreate the extensions when the language changes', () => {
        const { result, rerender } = renderCodeMirrorExtensions('plain');

        rerender({ language: 'typescript', theme: 'default' });

        expect(result.current).toHaveLength(2);
    });

    it('should recreate the extensions when the theme changes', () => {
        const { result, rerender } = renderCodeMirrorExtensions('javascript');
        const initialResult = result.current;

        rerender({ language: 'javascript', theme: 'dracula' });

        expect(result.current).not.toBe(initialResult);
    });
});
