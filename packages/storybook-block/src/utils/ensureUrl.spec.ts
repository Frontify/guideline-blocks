/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { ensureUrl } from './ensureUrl';

describe('ensureUrl', () => {
    test('It should keep http://', () => {
        const result = ensureUrl('http://fondue-components.frontify.com');
        expect(result).toEqual('http://fondue-components.frontify.com');
    });
    test('It should keep an https url', () => {
        const result = ensureUrl('https://fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
    test('It should prefix with https on no prefix ', () => {
        const result = ensureUrl('fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
});
