/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardCoordinateGetter, SensorContext } from '@dnd-kit/core';
import { customCoordinatesGetterFactory } from './customCoordinatesGetterFactory';
import { beforeEach, describe, expect, it } from 'vitest';

/**
 * @vitest-environment happy-dom
 */
describe('customCoordinatesGetterFactory', () => {
    const gap = 10;
    const initialCoordinates = { x: 0, y: 0 };
    const context = {
        activeNode: {
            offsetWidth: 100,
            offsetHeight: 200,
        },
    } as SensorContext;

    const active = 'mock-active-id';
    let customCoordinatesGetter: KeyboardCoordinateGetter;
    beforeEach(() => {
        customCoordinatesGetter = customCoordinatesGetterFactory(gap);
    });

    it('should respond to ArrowRight', () => {
        const result = customCoordinatesGetter(new KeyboardEvent('keydown', { code: 'ArrowRight' }), {
            active,
            currentCoordinates: initialCoordinates,
            context,
        });
        expect(result).toEqual({ x: 110, y: 0 });
    });

    it('should respond to ArrowLeft', () => {
        const result = customCoordinatesGetter(new KeyboardEvent('keydown', { code: 'ArrowLeft' }), {
            active,
            currentCoordinates: initialCoordinates,
            context,
        });
        expect(result).toEqual({ x: -110, y: 0 });
    });

    it('should respond to ArrowDown', () => {
        const result = customCoordinatesGetter(new KeyboardEvent('keydown', { code: 'ArrowDown' }), {
            active,
            currentCoordinates: initialCoordinates,
            context,
        });
        expect(result).toEqual({ x: 0, y: 210 });
    });

    it('should respond to ArrowUp', () => {
        const result = customCoordinatesGetter(new KeyboardEvent('keydown', { code: 'ArrowUp' }), {
            active,
            currentCoordinates: initialCoordinates,
            context,
        });
        expect(result).toEqual({ x: 0, y: -210 });
    });

    it('should return undefined for other keys', () => {
        const result = customCoordinatesGetter(new KeyboardEvent('keydown', { code: 'KeyA' }), {
            active,
            currentCoordinates: initialCoordinates,
            context,
        });
        expect(result).toBeUndefined();
    });
});
