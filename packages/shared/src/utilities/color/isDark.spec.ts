/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isDark } from './isDark';
import { describe, expect, test } from 'vitest';

describe('isDark', () => {
    const data = [
        { color: { r: 0, g: 0, b: 0 }, expected: true },
        { color: { r: 255, g: 255, b: 255 }, expected: false },
        { color: { r: 130, g: 95, b: 255 }, expected: true },
    ];

    test.each(data)('validate correctly values', ({ color, expected }) => {
        expect(isDark(color)).toBe(expected);
    });
});
