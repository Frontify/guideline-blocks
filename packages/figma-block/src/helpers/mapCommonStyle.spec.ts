/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getHeightOfBlock } from './mapCommonStyle';

describe('getHeightOfBlock', () => {
    it('should return the px height unchanged on desktop', () => {
        expect(getHeightOfBlock('400px', false)).toBe('400px');
    });

    it('should return half of the px height on mobile', () => {
        expect(getHeightOfBlock('400px', true)).toBe('200px');
    });

    it('should return a unitless height as px unchanged on mobile', () => {
        expect(getHeightOfBlock('400', true)).toBe('200px');
    });

    it('should return auto unchanged', () => {
        expect(getHeightOfBlock('auto', true)).toBe('auto');
    });

    it('should return percentage heights unchanged', () => {
        expect(getHeightOfBlock('100%', true)).toBe('100%');
    });

    it('should return vh heights unchanged', () => {
        expect(getHeightOfBlock('50vh', true)).toBe('50vh');
    });

    it('should return rem heights unchanged', () => {
        expect(getHeightOfBlock('2rem', true)).toBe('2rem');
    });
});
