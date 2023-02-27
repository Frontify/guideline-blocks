/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens, defaultGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { describe, expect, test } from 'vitest';
import { useCalloutColors } from './useCalloutColors';

describe('Styles are adjusted correctly for callout blocks', () => {
    test('It should adjust all relevant colors', () => {
        const changedDesignTokens = useCalloutColors(defaultGuidelineDesignTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading1.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading2.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading3.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading4.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('p.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('link.color', 'rgb(1,2,3)');
    });

    test('It should adjust link to be underlined', () => {
        const changedDesignTokens = useCalloutColors(defaultGuidelineDesignTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('link.textDecoration', 'underline');
    });

    test('It should not adjust custom styles and quotes', () => {
        const changedDesignTokens = useCalloutColors(defaultGuidelineDesignTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('custom1', defaultGuidelineDesignTokens.custom1);
        expect(changedDesignTokens).toHaveProperty('custom2', defaultGuidelineDesignTokens.custom2);
        expect(changedDesignTokens).toHaveProperty('custom3', defaultGuidelineDesignTokens.custom3);
        expect(changedDesignTokens).toHaveProperty('quote', defaultGuidelineDesignTokens.quote);
    });

    test('It should do nothing to invalid design tokens', () => {
        const changedDesignTokens = useCalloutColors(null as unknown as DesignTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toBeUndefined();
    });

    test('It should return original design tokens if no color is passed', () => {
        const changedDesignTokens = useCalloutColors(defaultGuidelineDesignTokens, undefined);
        expect(changedDesignTokens).toEqual(defaultGuidelineDesignTokens);
    });
});
