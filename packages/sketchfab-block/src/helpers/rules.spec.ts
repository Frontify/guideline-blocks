/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { pitchRule, sketchfabUrlRule, yawRule } from './rules';

const INVALID_NUMERIC_VALUES = ['1px', '5px', '4rem', '10px', '-1px', '%', 'auto', ' 10px', '', 'abc', 'px', 'rem'];

describe('pitchRule', () => {
    it.each([`${Math.PI / 2}`, `${-(Math.PI / 2)}`, '1', '0.4', '0.1', '-1'])('should accept "%s"', (value) => {
        expect(pitchRule.validate(value)).toBe(true);
    });

    it.each([`${Math.PI / 2 + 0.0001}`, ...INVALID_NUMERIC_VALUES])('should not accept "%s"', (value) => {
        expect(pitchRule.validate(value)).toBe(false);
    });
});

describe('yawRule', () => {
    it.each([`${Math.PI}`, `${-Math.PI}`, '1', '0.4', '0.1', '-1'])('should accept "%s"', (value) => {
        expect(yawRule.validate(value)).toBe(true);
    });

    it.each([`${Math.PI + 0.0001}`, ...INVALID_NUMERIC_VALUES])('should not accept "%s"', (value) => {
        expect(yawRule.validate(value)).toBe(false);
    });
});

describe('sketchfabUrlRule', () => {
    it.each([
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec?autospin=2',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/',
        'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed?autospin=1',
        'https://sketchfab.com/show/id-442c548d94744641ba279ae94b5f45ec?autospin=1',
        'https://sketchfab.com/show/id-442c548d94744641ba279ae94b5f45ec/',
        'https://sketchfab.com/3d-models/id-442c548d94744641ba279ae94b5f45ec/',
    ])('should accept "%s"', (value) => {
        expect(sketchfabUrlRule.validate(value)).toBe(true);
    });

    it.each(['sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed', ''])('should not accept "%s"', (value) => {
        expect(sketchfabUrlRule.validate(value)).toBe(false);
    });
});
