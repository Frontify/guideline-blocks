/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { relativeUrlRegex, telOrMailRegex, urlRegex, urlRegexWithHttps } from './regex';

describe('Regex values', () => {
    test('it should only match the appropriate URL values with http', () => {
        const testData = [
            {
                input: 'https://frontify.com',
                shouldMatch: true,
            },
            {
                input: 'http://frontify.com',
                shouldMatch: true,
            },
            {
                input: 'frontify.com',
                shouldMatch: false,
            },
            {
                input: 'frontify',
                shouldMatch: false,
            },
        ];
        for (const data of testData) {
            const isMatching = urlRegexWithHttps.test(data.input);
            expect(isMatching).toBe(data.shouldMatch);
        }
    });
    test('it should only match the appropriate URL values even without https', () => {
        const testData = [
            {
                input: 'https://frontify.com',
                shouldMatch: true,
            },
            {
                input: 'http://frontify.com',
                shouldMatch: true,
            },
            {
                input: 'frontify.com',
                shouldMatch: true,
            },
            {
                input: 'frontify',
                shouldMatch: false,
            },
        ];
        for (const data of testData) {
            const isMatching = urlRegex.test(data.input);
            expect(isMatching).toBe(data.shouldMatch);
        }
    });
    test('it should only match internal documents starting with /r/ or /document/', () => {
        const testData = [
            {
                input: '/document/123',
                shouldMatch: true,
            },
            {
                input: '/r/123',
                shouldMatch: true,
            },
            {
                input: '/wrong/123',
                shouldMatch: false,
            },
            {
                input: '/r/',
                shouldMatch: false,
            },
            {
                input: '/document/',
                shouldMatch: false,
            },
        ];
        for (const data of testData) {
            const isMatching = relativeUrlRegex.test(data.input);
            expect(isMatching).toBe(data.shouldMatch);
        }
    });
    test('it should only match tel or email strings', () => {
        const testData = [
            {
                input: 'mailto:something@example.com',
                shouldMatch: true,
            },
            {
                input: 'tel:+123321',
                shouldMatch: true,
            },
            {
                input: '+123321',
                shouldMatch: false,
            },
            {
                input: 'something@example.com',
                shouldMatch: false,
            },
        ];
        for (const data of testData) {
            const isMatching = telOrMailRegex.test(data.input);
            expect(isMatching).toBe(data.shouldMatch);
        }
    });
});
