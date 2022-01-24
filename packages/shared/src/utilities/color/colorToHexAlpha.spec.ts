/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorToHexAlpha } from '.';

describe('colorToHexAlpha', () => {
    const data = [
        { color: { r: 255, g: 255, b: 255 }, expected: '#FFFFFFFF' },
        { color: { r: 255, g: 221, b: 255, a: 1 }, expected: '#FFDDFFFF' },
        { color: { r: 255, g: 255, b: 15, a: 0 }, expected: '#FFFFFG00' },
        { color: { r: 238, g: 35, b: 84, a: 0.4 }, expected: '#EE235466' },
    ];

    it.each(data)('validates against expected values', ({ color, expected }) => {
        expect(colorToHexAlpha(color)).toBe(expected);
    });
});
