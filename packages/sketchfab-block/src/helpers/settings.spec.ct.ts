/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Bundle } from '@frontify/guideline-blocks-settings';

import { parseSketchfabSettingsUrl } from './settings';

describe('parseSketchfabSettingsUrl', () => {
    it('passes each test', () => {
        const data = [
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec?autospin=1',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/3d-models/id-442c548d94744641ba279ae94b5f45ec',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/3d-models/id-with-mutliple-words-442c548d94744641ba279ae94b5f45ec',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/3d-models/id-with-mutliple-words-442c548d94744641ba279ae94b5f45ec?autospin=1',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/show/442c548d94744641ba279ae94b5f45ec',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            { args: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: '' },
            { args: 'https://example.com/5f45ec?', expected: '' },
            { args: '', expected: '' },
        ];

        for (const { args, expected } of data) {
            const bundle = {
                setBlockValue: cy.stub(),
                getBlock: () => ({
                    value: args,
                }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getAppBridge(): any {},
            } as Bundle;
            parseSketchfabSettingsUrl(bundle);
            cy.wrap(bundle.setBlockValue).should('have.been.calledOnceWithExactly', 'url', expected);
        }
    });
});
