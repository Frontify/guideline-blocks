/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isDark } from './isDark';
import { describe, expect, test } from 'vitest';

describe('isDark', () => {
    const data = [
        { color: { red: 0, green: 0, blue: 0 }, expected: true },
        { color: { red: 255, green: 255, blue: 255 }, expected: false },
        { color: { red: 130, green: 95, blue: 255 }, expected: true },
    ];

    test.each(data)('validate correctly values', ({ color, expected }) => {
        expect(isDark(color)).toBe(expected);
    });
});
