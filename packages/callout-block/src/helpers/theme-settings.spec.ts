/* (c) Copyright Frontify Ltd., all rights reserved. */

import { THEME_PREFIX } from '@frontify/guideline-blocks-settings';
import { describe, expect, it } from 'vitest';

import { Icon } from '../types';

import { getOverwrittenThemeSettings } from './theme-settings';

const asRecord = (styles: ReturnType<typeof getOverwrittenThemeSettings>): Record<string, string> =>
    styles as Record<string, string>;

describe('getOverwrittenThemeSettings', () => {
    it('should set the text color for all supported theme tokens', () => {
        const result = getOverwrittenThemeSettings('#FF0000', Icon.None);

        expect(result).toMatchObject({
            [`${THEME_PREFIX}heading1-color`]: '#FF0000',
            [`${THEME_PREFIX}heading2-color`]: '#FF0000',
            [`${THEME_PREFIX}heading3-color`]: '#FF0000',
            [`${THEME_PREFIX}heading4-color`]: '#FF0000',
            [`${THEME_PREFIX}custom1-color`]: '#FF0000',
            [`${THEME_PREFIX}custom2-color`]: '#FF0000',
            [`${THEME_PREFIX}custom3-color`]: '#FF0000',
            [`${THEME_PREFIX}body-color`]: '#FF0000',
            [`${THEME_PREFIX}quote-color`]: '#FF0000',
            [`${THEME_PREFIX}link-color`]: '#FF0000',
            color: '#FF0000',
        });
    });

    it('should always underline links', () => {
        const result = asRecord(getOverwrittenThemeSettings('#000000', Icon.None));

        expect(result[`${THEME_PREFIX}link-text-decoration`]).toBe('underline');
    });

    it('should not reset margins when there is no icon', () => {
        const result = asRecord(getOverwrittenThemeSettings('#000000', Icon.None));

        expect(result[`${THEME_PREFIX}body-margin-top`]).toBeUndefined();
        expect(result[`${THEME_PREFIX}body-margin-bottom`]).toBeUndefined();
        expect(result[`${THEME_PREFIX}heading1-margin-top`]).toBeUndefined();
        expect(result[`${THEME_PREFIX}quote-margin-bottom`]).toBeUndefined();
    });

    it.each([Icon.Info, Icon.Lightbulb, Icon.Megaphone, Icon.Custom])(
        'should reset margins to 0px for all headings, body, custom and quote tokens when icon is %s',
        (iconType) => {
            const result = asRecord(getOverwrittenThemeSettings('#000000', iconType));

            const marginTokens = [
                'body-margin-top',
                'body-margin-bottom',
                'heading1-margin-top',
                'heading1-margin-bottom',
                'heading2-margin-top',
                'heading2-margin-bottom',
                'heading3-margin-top',
                'heading3-margin-bottom',
                'heading4-margin-top',
                'heading4-margin-bottom',
                'custom1-margin-top',
                'custom1-margin-bottom',
                'custom2-margin-top',
                'custom2-margin-bottom',
                'custom3-margin-top',
                'custom3-margin-bottom',
                'quote-margin-top',
                'quote-margin-bottom',
            ];

            for (const token of marginTokens) {
                expect(result[`${THEME_PREFIX}${token}`]).toBe('0px');
            }
        },
    );

    it('should keep the text color untouched when resetting margins', () => {
        const result = asRecord(getOverwrittenThemeSettings('#123456', Icon.Info));

        expect(result.color).toBe('#123456');
        expect(result[`${THEME_PREFIX}body-color`]).toBe('#123456');
    });
});
