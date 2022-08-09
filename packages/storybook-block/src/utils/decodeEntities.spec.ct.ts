/* (c) Copyright Frontify Ltd., all rights reserved. */

import { decodeEntities } from './decodeEntities';

describe('decodeEntities', () => {
    it('decodes URL', () => {
        const encodedUrl = 'https://fondue-components.frontify.com/?path&#61;/story/tokens--alias-tokens';
        const decodedUrl = 'https://fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
        expect(decodedUrl).to.equal(decodeEntities(encodedUrl));
    });

    it('does nothing with already decoded URL', () => {
        const decodedUrl = 'https://fondue-components.frontify.com/?path=/story/tokens--alias-tokens';
        expect(decodedUrl).to.equal(decodeEntities(decodedUrl));
    });

    it('decodes characters', () => {
        const encodedChars = '&#162;this&#38;&#174;&#60;is&#62;&#38;&#34&#39;awesome&#162;&#163;';
        const decodedChats = '¢this&®<is>&"\'awesome¢£';
        expect(decodedChats).to.equal(decodeEntities(encodedChars));
    });
});
