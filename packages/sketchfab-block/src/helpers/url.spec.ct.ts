/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';
import { generateUrl, getUrlWithoutSearchParams, isSketchfabUrl, removeSearchParams } from './url';

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
            { args: 'https://sketchfab.com/show/442c548d94744641ba279ae94b5f45ec?autospin=1', expected: true },
            { args: '', expected: false },
        ];

        for (const { args, expected } of data) {
            const valid = isSketchfabUrl(args);
            cy.wrap(expected).should('equal', valid);
        }
    });
});

describe('generateUrl', () => {
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
            const url = generateUrl(args[0], args[1]);
            cy.wrap(expected).should('equal', expected ? url?.toString() : null);
        }
    });
});

describe('getUrlWithoutSearchParams', () => {
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
            const url = getUrlWithoutSearchParams(args);
            cy.wrap(expected).should('equal', url);
        }
    });
});

describe('removeSearchParams', () => {
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
            const bundle = {
                setBlockValue: cy.stub(),
                getBlock: () => ({
                    value: args,
                }),
            } as Bundle;
            removeSearchParams(bundle);
            cy.wrap(bundle.setBlockValue).should('have.been.calledOnceWithExactly', 'url', expected);
        }
    });
});
