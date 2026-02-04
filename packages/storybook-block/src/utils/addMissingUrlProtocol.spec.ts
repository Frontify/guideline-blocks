/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { addMissingUrlProtocol } from './addMissingUrlProtocol';

describe('ensureUrl', () => {
    test('It should keep http://', () => {
        const result = addMissingUrlProtocol('http://fondue-components.frontify.com');
        expect(result).toEqual('http://fondue-components.frontify.com');
    });
    test('It should keep an https url', () => {
        const result = addMissingUrlProtocol('https://fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
    test('It should prefix with https on no prefix ', () => {
        const result = addMissingUrlProtocol('fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
});
