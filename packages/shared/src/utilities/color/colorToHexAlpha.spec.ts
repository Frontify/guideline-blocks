/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorToHexAlpha } from '.';

describe('colorToHexAlpha', () => {
    const data = [
        { color: { hex: '#FFFFFF' }, expected: '#FFFFFFFF' },
        { color: { hex: '#FFDDFF', alpha: 1 }, expected: '#FFDDFFFF' },
        { color: { hex: '#FFFFFG', alpha: 0 }, expected: '#FFFFFG00' },
        { color: { hex: '#EE2354', alpha: 0.4 }, expected: '#EE235466' },
    ];

    it.each(data)('validates against expected values', ({ color, expected }) => {
        expect(colorToHexAlpha(color)).toBe(expected);
    });
});
