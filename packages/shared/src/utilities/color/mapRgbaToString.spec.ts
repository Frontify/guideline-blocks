/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mapRgbaToString } from './mapRgbaToString';

describe('mapRgbaToString', () => {
    const data = [{ rgbaObject: { r: 1, g: 2, b: 3, a: 0.5 }, expected: 'rgba(1, 2, 3, 0.5)' }];

    it.each(data)('validates against expected values', ({ rgbaObject, expected }) => {
        expect(mapRgbaToString(rgbaObject)).toBe(expected);
    });
});
