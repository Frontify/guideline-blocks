/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';

export const isSketchfabUrl = (url: string) => {
    if (!url) {
        return false;
    }
    const regex = /^https:\/\/sketchfab.com\/(show|models)\/\w+/;
    return regex.test(url);
};

export const generateUrl = (href: string, params: Record<string, string | undefined | boolean>) => {
    const url = new URL(href);
    // eslint-disable-next-line unicorn/no-array-for-each
    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'string') {
            url.searchParams.set(key, value);
        }
    });
    return url;
};

export const getUrlWithoutSearchParams = (url?: string) => {
    if (!url) {
        return '';
    }
    const urlObj = new URL(url);
    return urlObj.origin + urlObj.pathname;
};

export const removeSearchParams = (bundle: Bundle) => {
    const url = getUrlWithoutSearchParams(bundle.getBlock('url')?.value as string);
    bundle.setBlockValue('url', url);
};
