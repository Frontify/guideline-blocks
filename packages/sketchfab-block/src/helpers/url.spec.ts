/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { generateIframeUrl, isParseableSketchfabUrl } from './url';

type IframeUrlParams = Parameters<typeof generateIframeUrl>[1];

const EMBED_URL = 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed';

describe('isParseableSketchfabUrl', () => {
    it.each([
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1',
        'https://sketchfab.com/3d-models/littlest-tokyo-94b24a60dc1b48248de50bf087c0f042',
        'https://sketchfab.com/show/442c548d94744641ba279ae94b5f45ec?autospin=1',
    ])('should parse "%s"', (url) => {
        expect(isParseableSketchfabUrl(url)).toBe(true);
    });

    it.each([
        'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
        'https://sketchfab.com/3d-models/94b24a60dc1b48248de50bf087c0f042',
        '',
    ])('should not parse "%s"', (url) => {
        expect(isParseableSketchfabUrl(url)).toBe(false);
    });
});

describe('generateIframeUrl', () => {
    it.each<{ url: string; params: IframeUrlParams; expected: string | null }>([
        {
            url: EMBED_URL,
            params: { autospin: '1', camera: '0', navigationMode: 'fps' },
            expected: `${EMBED_URL}?autospin=1&camera=0&navigationMode=fps`,
        },
        {
            url: EMBED_URL,
            params: { autospin: false, camera: 2, navigationMode: undefined } as unknown as IframeUrlParams,
            expected: EMBED_URL,
        },
        {
            url: EMBED_URL,
            // Unsupported value types should be dropped from the url
            params: { autospin: () => ({}), camera: null, navigationMode: 'string' } as unknown as IframeUrlParams,
            expected: `${EMBED_URL}?navigationMode=string`,
        },
        {
            url: 'fab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            params: { autospin: false, camera: 2, navigationMode: undefined } as unknown as IframeUrlParams,
            expected: null,
        },
    ])('should generate $expected from $url', ({ url, params, expected }) => {
        expect(generateIframeUrl(url, params)?.toString() ?? null).toBe(expected);
    });
});
