/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ImageFormat } from '../types';

const MAX_DEVICE_PIXEL_RATIO = 2;
const DEFAULT_QUALITY = 80;
const DEFAULT_HIGH_DENSITY_QUALITY = 75;

export const getDevicePixelRatio = () => Math.min(MAX_DEVICE_PIXEL_RATIO, Math.max(1, window.devicePixelRatio ?? 1));

type OptimisedImageOptions = {
    format?: ImageFormat;
    quality?: number;
};

export const getOptimisedImageUrl = (
    source: string,
    widthToRequest: number,
    { format = ImageFormat.WEBP, quality }: OptimisedImageOptions = {}
) => {
    const url = new URL(source.replace('{width}', widthToRequest.toString()), document.baseURI);
    const defaultQuality = getDevicePixelRatio() >= 2 ? DEFAULT_HIGH_DENSITY_QUALITY : DEFAULT_QUALITY;
    url.searchParams.set('format', format);
    url.searchParams.set('quality', (quality ?? defaultQuality).toString());
    return url.toString();
};
