/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { addHttps } from './addHttps';

describe('String converted to Richtext value', () => {
    test('It should return rich text value with correct textStyle', () => {
        const url = 'https://www.frontify.com';
        const result = addHttps(url);
        expect(result).toBe(url);
    });

    test('It should not add https:// for mailto', () => {
        const url = 'mailto:info@frontify.com';
        const result = addHttps(url);
        expect(result).toBe(url);
    });

    test('It should not add https:// for tel', () => {
        const url = 'tel:+41 44 552 02 22';
        const result = addHttps(url);
        expect(result).toBe(url);
    });

    test('It should add https://', () => {
        const url = 'frontify.com';
        const result = addHttps(url);
        expect(result).toBe('https://frontify.com');
    });

    test('It should not add https:// for relative url', () => {
        const url = '/document/123';
        const result = addHttps(url);
        expect(result).toBe(url);
    });
});
