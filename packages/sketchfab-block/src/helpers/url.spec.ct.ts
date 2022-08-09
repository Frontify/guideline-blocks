/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';
import { generateIframeUrl, getUrlStringWithoutSearchParams, isSketchfabUrl, parseSketchfabSettingsUrl } from './url';

describe('isSketchfabUrl', () => {
    it('passes each test', () => {
        const data = [
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
                expected: true,
            },
            { args: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: false },
            { args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec', expected: true },
            { args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec?autospin=1', expected: true },
            { args: 'https://sketchfab.com/3d-models/littlest-tokyo-94b24a60dc1b48248de50bf087c0f042', expected: true },
            { args: 'https://sketchfab.com/show/442c548d94744641ba279ae94b5f45ec?autospin=1', expected: true },
            { args: '', expected: false },
        ];

        for (const { args, expected } of data) {
            const valid = isSketchfabUrl(args);
            cy.wrap(expected).should('equal', valid);
        }
    });
});

describe('generateIframeUrl', () => {
    it('passes each test', () => {
        const data: { args: [string, { [key: string]: any }]; expected: string | null }[] = [
            {
                args: [
                    'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
                    { autospin: '1', camera: '0', navigationMode: 'fps' },
                ],
                expected:
                    'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&camera=0&navigationMode=fps',
            },
            {
                args: [
                    'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
                    { autospin: false, camera: 2, navigationMode: undefined },
                ],
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: [
                    'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
                    { autospin: () => ({}), camera: null, navigationMode: 'string' },
                ],
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?navigationMode=string',
            },
            {
                args: [
                    'fab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
                    { autospin: false, camera: 2, navigationMode: undefined },
                ],
                expected: null,
            },
        ];

        for (const { args, expected } of data) {
            const url = generateIframeUrl(args[0], args[1]);
            cy.wrap(expected).should('equal', expected ? url?.toString() : null);
        }
    });
});

describe('getUrlStringWithoutSearchParams', () => {
    it('passes each test', () => {
        const data = [
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            { args: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: '' },
            { args: 'https://example.com/5f45ec?', expected: 'https://example.com/5f45ec' },
            { args: '', expected: '' },
        ];

        for (const { args, expected } of data) {
            const url = getUrlStringWithoutSearchParams(args);
            cy.wrap(expected).should('equal', url);
        }
    });
});

describe('parseSketchfabSettingsUrl', () => {
    it('passes each test', () => {
        const data = [
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec',
                expected: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            {
                args: 'https://sketchfab.com/3d-models/442c548d94744641ba279ae94b5f45ec',
                expected: 'https://sketchfab.com/3d-models/442c548d94744641ba279ae94b5f45ec/embed',
            },
            { args: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: '' },
            { args: 'https://example.com/5f45ec?', expected: 'https://example.com/5f45ec/embed' },
            { args: '', expected: '' },
        ];

        for (const { args, expected } of data) {
            const bundle = {
                setBlockValue: cy.stub(),
                getBlock: () => ({
                    value: args,
                }),
            } as Bundle;
            parseSketchfabSettingsUrl(bundle);
            cy.wrap(bundle.setBlockValue).should('have.been.calledOnceWithExactly', 'url', expected);
        }
    });
});
