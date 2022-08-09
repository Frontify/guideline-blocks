/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';

export const isSketchfabUrl = (url: string) => {
    if (!url) {
        return false;
    }
    const regex = /^https:\/\/(www\.)?sketchfab.com\/(show|models|3d-models)\/\w+/;

    return regex.test(url);
};

export const generateUrl = (href: string, params: Record<string, string | undefined | boolean>) => {
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
    const embedUrl = applyEmbedToUrl(url);

    bundle.setBlockValue('url', embedUrl);
};

export const applyEmbedToUrl = (url: string) => (!url || /\/embed$/.test(url) ? url : `${url}/embed`);
