/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mapRgbaToString } from './mapRgbaToString';

describe('mapRgbaToString', () => {
    const data = [{ color: { r: 1, g: 2, b: 3, a: 0.5 }, expected: 'rgba(1, 2, 3, 0.5)' }];

    it.each(data)('validates against expected values', ({ color, expected }) => {
        expect(mapRgbaToString(color)).toBe(expected);
    });
});
