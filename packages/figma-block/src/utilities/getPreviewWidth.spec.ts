/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPreviewWidth } from './getPreviewWidth';

const stubScreen = ({ devicePixelRatio, screenWidth }: { devicePixelRatio: number; screenWidth: number }) => {
    vi.stubGlobal('devicePixelRatio', devicePixelRatio);
    vi.spyOn(window.screen, 'width', 'get').mockReturnValue(screenWidth);
};

describe('getPreviewWidth', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should request the block width times the device pixel ratio when the preview is not zoomable', () => {
        stubScreen({ devicePixelRatio: 2, screenWidth: 1920 });

        expect(getPreviewWidth(800, false)).toBe(1600);
    });

    it('should request at least 2560 pixels when the preview is zoomable', () => {
        stubScreen({ devicePixelRatio: 1, screenWidth: 1920 });

        expect(getPreviewWidth(800, true)).toBe(2560);
    });

    it('should request the screen width times the device pixel ratio when that is larger and the preview is zoomable', () => {
        stubScreen({ devicePixelRatio: 2, screenWidth: 1920 });

        expect(getPreviewWidth(800, true)).toBe(3840);
    });
});
