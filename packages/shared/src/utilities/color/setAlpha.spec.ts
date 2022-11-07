/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setAlpha } from './setAlpha';
import { describe, expect, test } from 'vitest';

describe('setAlpha', () => {
    const data = [
        {
            color: { red: 255, green: 255, blue: 255 },
            alpha: 1,
            expected: 'rgb(255, 255, 255)',
        },
        {
            color: { r: 255, g: 255, b: 255 },
            alpha: 0.2,
            expected: 'rgba(255, 255, 255, 0.2)',
        },
        {
            color: { red: 215, green: 25, blue: 255 },
            alpha: 0.1,
            expected: 'rgba(215, 25, 255, 0.1)',
        },
        {
            color: 'rgba(255, 255, 255, 0.1)',
            alpha: 1,
            expected: 'rgb(255, 255, 255)',
        },
        {
            color: 'rgb(255, 255, 255)',
            alpha: 0.9,
            expected: 'rgba(255, 255, 255, 0.9)',
        },
        {
            color: '#00000',
            alpha: 0.9,
            expected: 'rgba(0, 0, 0, 0.9)',
        },
    ];

    test.each(data)('validates against expected values', ({ color, alpha, expected }) => {
        expect(setAlpha(color, alpha)).toBe(expected);
    });
});
