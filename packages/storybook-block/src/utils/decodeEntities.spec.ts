/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { decodeEntities } from './decodeEntities';

describe('decodeEntities', () => {
    it('should decode a URL', () => {
        const encodedUrl = 'https://fondue-components.frontify.com/?path&#61;/story/tokens--alias-tokens';
        const decodedUrl = 'https://fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
        expect(decodeEntities(encodedUrl)).toBe(decodedUrl);
    });

    it('should not change an already decoded URL', () => {
        const decodedUrl = 'https://fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
        expect(decodeEntities(decodedUrl)).toBe(decodedUrl);
    });

    it('should decode characters', () => {
        const encodedChars = '&#162;this&#38;&#174;&#60;is&#62;&#38;&#34&#39;awesome&#162;&#163;';
        const decodedChars = '¢this&®<is>&"\'awesome¢£';
        expect(decodeEntities(encodedChars)).toBe(decodedChars);
    });
});
