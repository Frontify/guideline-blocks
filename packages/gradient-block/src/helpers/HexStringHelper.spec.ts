/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { toHex6or8String } from './HexStringHelper';

describe('HexStringHelper', () => {
    it('should generate a hex 6 string if alpha is 1', () => {
        expect(toHex6or8String({ blue: 255, red: 255, green: 255, alpha: 1 })).toBe('#ffffff');
    });

    it('should generate a hex 6 string if alpha is undefined', () => {
        expect(toHex6or8String({ blue: 255, red: 255, green: 255 })).toBe('#ffffff');
    });

    it('should generate a hex 8 string if alpha is 0.5', () => {
        expect(toHex6or8String({ blue: 255, red: 255, green: 255, alpha: 0.5 })).toBe('#ffffff80');
    });
});
