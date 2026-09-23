/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isStageRendered } from './isStageRendered';

const entryWith = (width: number, height: number) => ({ contentRect: { width, height } }) as ResizeObserverEntry;

describe('isStageRendered', () => {
    it('should consider a stage with a layout box rendered', () => {
        expect(isStageRendered(entryWith(900, 400))).toBe(true);
    });

    it('should not consider a stage without a layout box rendered', () => {
        expect(isStageRendered(entryWith(0, 0))).toBe(false);
    });

    it('should not consider a stage without height rendered', () => {
        expect(isStageRendered(entryWith(900, 0))).toBe(false);
    });

    it('should not consider a stage without width rendered', () => {
        expect(isStageRendered(entryWith(0, 400))).toBe(false);
    });

    it('should not consider a missing entry rendered', () => {
        expect(isStageRendered(undefined)).toBe(false);
    });
});
