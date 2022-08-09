/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';

// eslint-disable-next-line unicorn/no-unsafe-regex
export const SKETCHFAB_PREVIEW_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/(3d-models|show)\/(\w+-)+(?<id>\w+)$/;
export const SKETCHFAB_EMBED_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/models\/\w+\/embed$/;

export const isSketchfabUrl = (url: string) => {
    if (!url) {
        return false;
    }

    return SKETCHFAB_PREVIEW_REGEX.test(url) || SKETCHFAB_EMBED_REGEX.test(url);
};

export const generateIframeUrl = (href: string, params: Record<string, string | undefined | boolean>) => {
    try {
        const url = new URL(href);
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === 'string') {
                url.searchParams.set(key, value);
            }
        }

        return url;
    } catch {
        return null;
    }
};

export const getUrlStringWithoutSearchParams = (url?: string) => {
    try {
        if (!url) {
            throw 'No url supplied';
        }
        const urlObj = new URL(url);
        return urlObj.origin + urlObj.pathname;
    } catch (e) {
        return '';
    }
};

export const parseSketchfabSettingsUrl = (bundle: Bundle) => {
    const url = getUrlStringWithoutSearchParams(bundle.getBlock('url')?.value as string);
    const embedUrl = generateSketchfabEmbedUrl(url);

    bundle.setBlockValue('url', embedUrl);
};

export const generateSketchfabEmbedUrl = (url: string) => {
    try {
        if (SKETCHFAB_EMBED_REGEX.test(url)) {
            return url;
        }
        const match = url.match(SKETCHFAB_PREVIEW_REGEX);
        if (match) {
            const id = match?.groups?.id;
            return `https://sketchfab.com/models/${id}/embed`;
        }

        throw 'Unsupported Sketchfab URL';
    } catch (e) {
        return '';
    }
};
