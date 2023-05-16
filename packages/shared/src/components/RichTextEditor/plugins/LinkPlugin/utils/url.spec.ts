/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { isValidUrl } from './url';

describe('LinkPlugin URL utils', () => {
    test('isValidUrl validator', () => {
        const testData = [
            {
                input: 'https://frontify.com',
                shouldBeValid: true,
            },
            {
                input: 'http://frontify.com',
                shouldBeValid: true,
            },
            {
                input: 'mailto:hello@frontify.com',
                shouldBeValid: true,
            },
            {
                input: 'tel:+123456789',
                shouldBeValid: true,
            },
            {
                input: '/r/123',
                shouldBeValid: true,
            },
            {
                input: '/document/123',
                shouldBeValid: true,
            },
            {
                input: '/wrongpage/123',
                shouldBeValid: false,
            },
            {
                input: '+123456789',
                shouldBeValid: false,
            },
            {
                input: 'hello@frontify.com',
                shouldBeValid: false,
            },
            {
                input: 'frontify.com',
                shouldBeValid: false,
            },
            {
                input: 'frontify',
                shouldBeValid: false,
            },
        ];
        for (const data of testData) {
            const isValid = isValidUrl(data.input);
            expect(isValid).toBe(data.shouldBeValid);
        }
    });
});
