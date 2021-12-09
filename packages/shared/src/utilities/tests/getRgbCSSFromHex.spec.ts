/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getRgbCSSFromHex } from './getRgbCSSFromHex';

describe('getRgbCSSFromHex', () => {
    const data = [
        { hex: '#FFFFFF', expected: 'rgb(255, 255, 255)' },
        { hex: '#4609F6', expected: 'rgb(70, 9, 246)' },
        { hex: '#000000', expected: 'rgb(0, 0, 0)' },
    ];

    it.each(data)('validate correctly values', ({ hex, expected }) => {
        expect(getRgbCSSFromHex(hex)).toBe(expected);
    });
});
