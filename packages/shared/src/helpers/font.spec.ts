/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { getFont } from './font';

describe('provideDefaultCalloutColors', () => {
    it('should use main font', () => {
        const result = getFont('inherit', 'Arial');
        expect(result).toBe('Arial');
    });
    it('should use system font', () => {
        const result = getFont('default', 'Arial');
        expect(result).toBe('system-ui');
    });
    it('should use font', () => {
        const result = getFont('Helvetia', 'Arial');
        expect(result).toBe('Helvetia');
    });
});
