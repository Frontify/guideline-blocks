/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import {
    defaultCalloutColors,
    defaultHeading1Tokens,
    defaultHeading2Tokens,
    defaultHeading3Tokens,
    defaultHeading4Tokens,
    provideFallbackTokens,
} from './provideFallbackTokens';

const defaultTokens = {
    heading1: defaultHeading1Tokens,
    heading2: defaultHeading2Tokens,
    heading3: defaultHeading3Tokens,
    heading4: defaultHeading4Tokens,
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
                family: 'Arial',
                weight: 'bold',
                size: '24px',
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
                family: 'Verdana',
                margin_top: '10px',
                margin_bottom: '20px',
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
                ...defaultHeading2Tokens,
                family: 'Verdana',
                margin_top: '10px',
                margin_bottom: '20px',
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
                ...defaultHeading2Tokens,
                family: 'Verdana',
                margin_top: '10px',
                margin_bottom: '20px',
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
});
