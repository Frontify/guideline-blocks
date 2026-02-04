/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { MouseProperties } from './MouseProperties';

describe('MouseProperties', () => {
    it('return the correct mouse position', () => {
        const event = {
            pageX: 1,
            pageY: 2,
        } as MouseEvent;

        const result = MouseProperties.getCurrentPosition(event);
        expect(result).toEqual({ x: 1, y: 2 });
    });
});
