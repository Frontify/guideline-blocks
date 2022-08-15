/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { ensureHttps } from './ensureHttps';

describe('ensureHttps', () => {
    test('It should set an http url to https', () => {
        const result = ensureHttps('http://fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
    test('It should keep an https url', () => {
        const result = ensureHttps('https://fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
    test('It should prefix with https on // prefix ', () => {
        const result = ensureHttps('//fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
    test('It should prefix with https on no prefix ', () => {
        const result = ensureHttps('fondue-components.frontify.com');
        expect(result).toEqual('https://fondue-components.frontify.com');
    });
});
