/* (c) Copyright Frontify Ltd., all rights reserved. */

const MAX_DEVICE_PIXEL_RATIO = 2;
// Zooming in on a frame only stays sharp if there are more pixels than the block shows.
const MIN_ZOOMABLE_WIDTH = 2560;
const DEFAULT_QUALITY = 80;
const HIGH_DENSITY_QUALITY = 75;

const getDevicePixelRatio = () => Math.min(MAX_DEVICE_PIXEL_RATIO, Math.max(1, window.devicePixelRatio || 1));

export const getPreviewWidth = (blockWidth: number, isZoomable: boolean) => {
    const devicePixelRatio = getDevicePixelRatio();
    const blockPixelWidth = Math.ceil(blockWidth * devicePixelRatio);

    if (!isZoomable) {
        return blockPixelWidth;
    }

    return Math.max(blockPixelWidth, Math.ceil(window.screen.width * devicePixelRatio), MIN_ZOOMABLE_WIDTH);
};

export const getPreviewUrl = (url: string, width: number) => {
    const previewUrl = new URL(url.replace('{width}', width.toString()), document.baseURI);
    previewUrl.searchParams.set('format', 'webp');
    previewUrl.searchParams.set(
        'quality',
        (getDevicePixelRatio() >= 2 ? HIGH_DENSITY_QUALITY : DEFAULT_QUALITY).toString()
    );
    return previewUrl.toString();
};
