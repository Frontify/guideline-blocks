/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import { describe, expect, it } from 'vitest';

import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from '../settings';
import { type Settings } from '../types';

import { getDoDontContainerStyle } from './getDoDontContainerStyle';

const createBlockSettings = (overrides: Partial<Settings> = {}): Settings =>
    ({
        borderWidth: '1px',
        backgroundColor: null,
        borderColor: null,
        borderStyle: BorderStyle.Solid,
        hasBackground: false,
        hasBorder: false,
        hasRadius: false,
        radiusChoice: Radius.None,
        radiusValue: undefined,
        ...overrides,
    }) as Settings;

describe('getDoDontContainerStyle', () => {
    it('resolves the default background and border color when none are set', () => {
        const result = getDoDontContainerStyle(createBlockSettings());

        expect(result.resolvedBackgroundColor).toEqual(DEFAULT_BACKGROUND_COLOR);
        expect(result.resolvedBorderColor).toEqual(DEFAULT_BORDER_COLOR);
    });

    it('resolves the custom background and border color when set', () => {
        const backgroundColor = { red: 1, green: 2, blue: 3, alpha: 1 };
        const borderColor = { red: 4, green: 5, blue: 6, alpha: 1 };

        const result = getDoDontContainerStyle(createBlockSettings({ backgroundColor, borderColor }));

        expect(result.resolvedBackgroundColor).toEqual(backgroundColor);
        expect(result.resolvedBorderColor).toEqual(borderColor);
    });

    it('passes through the remaining container settings unchanged', () => {
        const result = getDoDontContainerStyle(
            createBlockSettings({
                borderWidth: '3px',
                borderStyle: BorderStyle.Dashed,
                hasBackground: true,
                hasBorder: true,
                hasRadius: true,
                radiusChoice: Radius.Medium,
                radiusValue: '8px',
            })
        );

        expect(result).toMatchObject({
            borderWidth: '3px',
            borderStyle: BorderStyle.Dashed,
            hasBackground: true,
            hasBorder: true,
            hasRadius: true,
            radiusChoice: Radius.Medium,
            radiusValue: '8px',
        });
    });
});
