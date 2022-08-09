/* (c) Copyright Frontify Ltd., all rights reserved. */

import { pitchRule, sketchfabUrlRule, yawRule } from './rules';

describe('pitchRule', () => {
    it('passes each test', () => {
        const data = [
            { value: `${Math.PI / 2}`, expected: true },
            { value: `${-(Math.PI / 2)}`, expected: true },
            { value: '1', expected: true },
            { value: '0.4', expected: true },
            { value: '0.1', expected: true },
            { value: '-1', expected: true },
            { value: `${Math.PI / 2 + 0.0001}`, expected: false },
            { value: '1px', expected: false },
            { value: '5px', expected: false },
            { value: '4rem', expected: false },
            { value: '10px', expected: false },
            { value: '-1px', expected: false },
            { value: '%', expected: false },
            { value: 'auto', expected: false },
            { value: ' 10px', expected: false },
            { value: '', expected: false },
            { value: 'abc', expected: false },
            { value: 'px', expected: false },
            { value: 'rem', expected: false },
        ];

        for (const test of data) {
            const valid = pitchRule.validate(test.value);
            cy.wrap(test.expected).should('equal', valid);
        }
    });
});

describe('yawRule', () => {
    it('passes each test', () => {
        const data = [
            { value: `${Math.PI}`, expected: true },
            { value: `${-Math.PI}`, expected: true },
            { value: '1', expected: true },
            { value: '0.4', expected: true },
            { value: '0.1', expected: true },
            { value: '-1', expected: true },
            { value: `${Math.PI + 0.0001}`, expected: false },
            { value: '1px', expected: false },
            { value: '5px', expected: false },
            { value: '4rem', expected: false },
            { value: '10px', expected: false },
            { value: '-1px', expected: false },
            { value: '%', expected: false },
            { value: 'auto', expected: false },
            { value: ' 10px', expected: false },
            { value: '', expected: false },
            { value: 'abc', expected: false },
            { value: 'px', expected: false },
            { value: 'rem', expected: false },
        ];

        for (const test of data) {
            const valid = yawRule.validate(test.value);
            cy.wrap(test.expected).should('equal', valid);
        }
    });
});

describe('sketchfabUrlRule', () => {
    it('passes each test', () => {
        const data = [
            {
                value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
                expected: true,
            },
            { value: 'sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', expected: false },
            { value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec', expected: true },
            { value: 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1', expected: true },
            { value: 'https://sketchfab.com/show/id-442c548d94744641ba279ae94b5f45ec?autospin=1', expected: true },
            { value: '', expected: false },
        ];

        for (const test of data) {
            const valid = sketchfabUrlRule.validate(test.value);
            cy.wrap(test.expected).should('equal', valid);
        }
    });
});
