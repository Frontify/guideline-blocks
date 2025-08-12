/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { aspectRatioFormatRule, aspectRatioNumberRule } from './ruleValidations';

describe('aspectRatioFormatRule', () => {
    it('should validate correct aspect ratio format with numbers', () => {
        expect(aspectRatioFormatRule.validate('16:9')).toBe(true);
        expect(aspectRatioFormatRule.validate('1:1')).toBe(true);
        expect(aspectRatioFormatRule.validate('4:3')).toBe(true);
    });

    it('should accept the token none', () => {
        expect(aspectRatioFormatRule.validate('none')).toBe(true);
    });

    it('should reject aspect ratio without colon separator', () => {
        const result = aspectRatioFormatRule.validate('169');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with multiple colons', () => {
        const result = aspectRatioFormatRule.validate('16:9:4');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with non-numeric values', () => {
        const result = aspectRatioFormatRule.validate('16:a');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with empty values', () => {
        const result = aspectRatioFormatRule.validate(':9');
        expect(result).toBe(false);
    });

    it('should reject empty string', () => {
        const result = aspectRatioFormatRule.validate('');
        expect(result).toBe(false);
    });

    it('should have correct error message', () => {
        expect(aspectRatioFormatRule.errorMessage).toBe('Please use the proper format for the image aspect ratio x:y');
    });
});

describe('aspectRatioNumberRule', () => {
    it('should validate aspect ratio with positive numbers', () => {
        expect(aspectRatioFormatRule.validate('16:9')).toBe(true);
        expect(aspectRatioFormatRule.validate('1:1')).toBe(true);
        expect(aspectRatioFormatRule.validate('4:3')).toBe(true);
    });

    it('should accept the token none', () => {
        expect(aspectRatioFormatRule.validate('none')).toBe(true);
    });

    it('should reject aspect ratio with zero width', () => {
        const result = aspectRatioNumberRule.validate('0:9');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with zero height', () => {
        const result = aspectRatioNumberRule.validate('16:0');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with negative width', () => {
        const result = aspectRatioNumberRule.validate('-16:9');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with negative height', () => {
        const result = aspectRatioNumberRule.validate('16:-9');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with both negative values', () => {
        const result = aspectRatioNumberRule.validate('-16:-9');
        expect(result).toBe(false);
    });

    it('should reject aspect ratio with both zero values', () => {
        const result = aspectRatioNumberRule.validate('0:0');
        expect(result).toBe(false);
    });

    it('should have correct error message', () => {
        expect(aspectRatioNumberRule.errorMessage).toBe('Please use values greater than 0');
    });
});
