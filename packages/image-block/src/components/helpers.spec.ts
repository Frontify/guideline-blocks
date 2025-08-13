/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { getImageObjectFitValue, getImageObjectPositionValue, getImageRatioValue } from './helpers';
import { type Settings } from '../types';

describe('getImageRatioValue()', () => {
    it('should return auto', () => {
        expect(getImageRatioValue({} as Settings)).toEqual('auto');
    });

    it('should return 1/1 for hasCustomRatio=false and ratioChoice set', () => {
        const settings = { ratioChoice: '1:1' } as Settings;
        expect(getImageRatioValue(settings)).toEqual('1/1');
    });

    it('should return 3/4 for hasCustomRatio=true and ratioCustom set on 3:4', () => {
        const settings = { hasCustomRatio: true, ratioCustom: '3:4' } as Settings;
        expect(getImageRatioValue(settings)).toEqual('3/4');
    });

    it('should return auto for hasCustomRatio=false and ratioChoice set on none', () => {
        const settings = { hasCustomRatio: false, ratioChoice: 'none' } as unknown as Settings;
        expect(getImageRatioValue(settings)).toEqual('auto');
    });
});

describe('getImageObjectFitValue()', () => {
    it('should return contain for autosizing=fit', () => {
        expect(getImageObjectFitValue({ autosizing: 'fit' } as Settings)).toEqual('contain');
    });

    it('should return cover for autosizing=fill', () => {
        expect(getImageObjectFitValue({ autosizing: 'fill' } as Settings)).toEqual('cover');
    });

    it('should return scale-down for autosizing=none', () => {
        expect(getImageObjectFitValue({ autosizing: 'none' } as Settings)).toEqual('scale-down');
    });
});

describe('getImageObjectPositionValue()', () => {
    it('should return provided vertical and horizontal alignment', () => {
        expect(
            getImageObjectPositionValue({ alignment: 'Left', horizontalAlignment: 'top' } as Settings, {
                focalPointX: 0.5,
                focalPointY: 0.5,
            })
        ).toEqual('left top');
    });

    it('should return provided focal point', () => {
        expect(
            getImageObjectPositionValue(
                { alignment: 'Left', horizontalAlignment: 'top', useFocalPoint: true, autosizing: 'fill' } as Settings,
                {
                    focalPointX: 0.5,
                    focalPointY: 0.5,
                }
            )
        ).toEqual('50% 50%');
    });
});
