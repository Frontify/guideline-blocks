/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isDark } from './isDark';

describe('isDark', () => {
    const data = [
        { rgbaObject: { r: 0, g: 0, b: 0 }, expected: true },
        { rgbaObject: { r: 255, g: 255, b: 255 }, expected: false },
        { rgbaObject: { r: 130, g: 95, b: 255 }, expected: true },
    ];

    it.each(data)('validate correctly values', ({ rgbaObject, expected }) => {
        expect(isDark(rgbaObject)).toBe(expected);
    });
});
