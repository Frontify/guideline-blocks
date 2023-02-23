/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import {
    defaultBodyTextTokens,
    defaultButtonPrimaryTokens,
    defaultButtonSecondaryTokens,
    defaultButtonTertiaryTokens,
    defaultCalloutColors,
    defaultCustomTokens,
    defaultHeading1Tokens,
    defaultHeading2Tokens,
    defaultHeading3Tokens,
    defaultHeading4Tokens,
    defaultImageCaptionTokens,
    defaultImageTitleTokens,
    defaultLinkTokens,
    defaultQuoteTokens,
} from './defaultTokens';
import { provideFallbackTokens } from './provideFallbackTokens';

const defaultTokens = {
    heading1: defaultHeading1Tokens,
    heading2: defaultHeading2Tokens,
    heading3: defaultHeading3Tokens,
    heading4: defaultHeading4Tokens,
    custom1: defaultCustomTokens,
    custom2: defaultCustomTokens,
    custom3: defaultCustomTokens,
    p: defaultBodyTextTokens,
    link: defaultLinkTokens,
    quote: defaultQuoteTokens,
    imageTitle: defaultImageTitleTokens,
    imageCaption: defaultImageCaptionTokens,
    buttonPrimary: defaultButtonPrimaryTokens,
    buttonSecondary: defaultButtonSecondaryTokens,
    buttonTertiary: defaultButtonTertiaryTokens,
    callout: defaultCalloutColors,
};

describe('provideFallbackTokens', () => {
    test('it should return default tokens', () => {
        const result = provideFallbackTokens({});
        expect(result).toEqual(defaultTokens);
    });

    test('it should keep heading1 tokens where set', () => {
        const result = provideFallbackTokens({
            heading1: {
                family: 'Arial',
                weight: 'bold',
                size: '24px',
            },
        });
        expect(result).toEqual({
            ...defaultTokens,
            heading1: {
                ...defaultHeading1Tokens,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: '24px',
            },
        });
    });

    test('it should keep heading2 tokens where set', () => {
        const result = provideFallbackTokens({
            heading2: {
                family: 'Verdana',
                margin_top: '10px',
                margin_bottom: '20px',
            },
        });
        expect(result).toEqual({
            ...defaultTokens,
            heading2: {
                ...defaultHeading2Tokens,
                fontFamily: 'Verdana',
                marginTop: '10px',
                marginBottom: '20px',
            },
        });
    });

    test('it should keep heading3 tokens where set', () => {
        const result = provideFallbackTokens({
            heading3: {
                family: 'Verdana',
                margin_top: '10px',
                margin_bottom: '20px',
            },
        });
        expect(result).toEqual({
            ...defaultTokens,
            heading3: {
                ...defaultHeading3Tokens,
                fontFamily: 'Verdana',
                marginTop: '10px',
                marginBottom: '20px',
            },
        });
    });

    test('it should keep heading4 tokens where set', () => {
        const result = provideFallbackTokens({
            heading4: {
                family: 'Comic Sans',
            },
        });
        expect(result).toEqual({
            ...defaultTokens,
            heading4: {
                ...defaultHeading4Tokens,
                fontFamily: 'Comic Sans',
            },
        });
    });

    test('it should keep callout colors where set', () => {
        const result = provideFallbackTokens({
            callout: {
                info: '#000000',
                tip: '#222222',
            },
        });
        expect(result).toEqual({
            ...defaultTokens,
            callout: {
                ...defaultCalloutColors,
                info: '#000000',
                tip: '#222222',
            },
        });
    });

    // it('should transform uppercase to textTransform', () => {
    //     const result = provideFallbackTokens({ body: { uppercase: '1' } });
    //     expect(result).toMatchObject({ p: { textTransform: 'uppercase' } });
    // });

    // it('should transform italic to fontStyle', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { italic: '1' } });
    //     expect(result).toMatchObject({ p: { fontStyle: 'italic' } });
    // });

    // it('should transform underline to textDecoration', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { underline: '1' } });
    //     expect(result).toMatchObject({ p: { textDecoration: 'underline' } });
    // });

    // it('should transform color value', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { color: '#fff' } });
    //     expect(result).toMatchObject({ p: { color: '#fff' } });
    // });

    // it('should transform fontfamily', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { family: 'Helvetia' }, main_font: { family: 'Arial' } });
    //     expect(result).toMatchObject({ p: { fontFamily: 'Helvetia' } });
    // });

    // it('should transform main fontfamily', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { family: 'inherit' }, main_font: { family: 'Arial' } });
    //     expect(result).toMatchObject({ p: { fontFamily: 'Arial' } });
    // });

    // it('should use system font', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { family: 'default' }, main_font: { family: 'Arial' } });
    //     expect(result).toMatchObject({ p: { fontFamily: 'system-ui' } });
    // });

    // it('should use system when no main font is defined', () => {
    //     const result = mapToGuidelineDesignTokens({ body: { family: 'inherit' }, main_font: { family: 'default' } });
    //     expect(result).toMatchObject({ p: { fontFamily: 'system-ui' } });
    // });
});
