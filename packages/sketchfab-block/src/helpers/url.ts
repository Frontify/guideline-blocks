/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';

export const isSketchfabUrl = (url: string) => {
    if (!url) {
        return false;
    }
    const regex = /^https:\/\/(www\.)?sketchfab.com\/(show|models)\/\w+/;

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

export const getUrlWithoutSearchParams = (url?: string) => {
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

export const removeSearchParams = (bundle: Bundle) => {
    const url = getUrlWithoutSearchParams(bundle.getBlock('url')?.value as string);
    bundle.setBlockValue('url', url);
};
