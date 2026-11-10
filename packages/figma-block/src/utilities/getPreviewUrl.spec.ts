/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPreviewUrl, getPreviewWidth } from './getPreviewUrl';

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

    it('should cap the device pixel ratio at 2', () => {
        stubScreen({ devicePixelRatio: 3, screenWidth: 1920 });

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

describe('getPreviewUrl', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should replace the width placeholder and request webp', () => {
        vi.stubGlobal('devicePixelRatio', 1);

        expect(getPreviewUrl('https://preview.url/frame?width={width}', 1600)).toBe(
            'https://preview.url/frame?width=1600&format=webp&quality=80'
        );
    });

    it('should lower the quality on high density screens', () => {
        vi.stubGlobal('devicePixelRatio', 2);

        expect(getPreviewUrl('https://preview.url/frame?width={width}&format=png', 1600)).toBe(
            'https://preview.url/frame?width=1600&format=webp&quality=75'
        );
    });
});
