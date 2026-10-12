/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Bundle } from '@frontify/guideline-blocks-settings';
import { describe, expect, it, vi } from 'vitest';

import { parseSketchfabSettingsUrl } from './settings';

const EMBED_URL = 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed';

describe('parseSketchfabSettingsUrl', () => {
    it.each([
        {
            value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
            expected: EMBED_URL,
        },
        { value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: EMBED_URL },
        { value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/', expected: EMBED_URL },
        { value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec?autospin=1', expected: EMBED_URL },
        { value: 'https://sketchfab.com/3d-models/id-442c548d94744641ba279ae94b5f45ec', expected: EMBED_URL },
        {
            value: 'https://sketchfab.com/3d-models/id-with-mutliple-words-442c548d94744641ba279ae94b5f45ec',
            expected: EMBED_URL,
        },
        {
            value: 'https://sketchfab.com/3d-models/id-with-mutliple-words-442c548d94744641ba279ae94b5f45ec?autospin=1',
            expected: EMBED_URL,
        },
        { value: 'https://sketchfab.com/show/442c548d94744641ba279ae94b5f45ec', expected: EMBED_URL },
        { value: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: '' },
        { value: 'https://example.com/5f45ec?', expected: '' },
        { value: '', expected: '' },
    ])('should set the url to "$expected" for "$value"', ({ value, expected }) => {
        const bundle = {
            setBlockValue: vi.fn(),
            getBlock: () => ({ value }),
            // oxlint-disable-next-line typescript/no-explicit-any
            getAppBridge(): any {},
        } as Bundle;

        parseSketchfabSettingsUrl(bundle);

        expect(bundle.setBlockValue).toHaveBeenCalledExactlyOnceWith('url', expected);
    });
});
