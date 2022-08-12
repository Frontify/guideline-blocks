/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Bundle } from '@frontify/guideline-blocks-settings';

const SKETCHFAB_NEW_PREVIEW_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/3d-models\/(\w|-)+-(?<id>\w+)/;
/* Sketchfab's preview url structure used to be the same as the embed url (without /embed). 
    We still support the old url and automatically append /embed when required */
const SKETCHFAB_EMBED_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/(models|show)\/\w+(\/embed)?/;

export const isParseableSketchfabUrl = (url: string) =>
    !!url && (SKETCHFAB_NEW_PREVIEW_REGEX.test(url) || SKETCHFAB_EMBED_REGEX.test(url));

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

const getUrlStringWithoutSearchParams = (url?: string) => {
    try {
        if (!url) {
            throw 'No url supplied';
        }
        const urlObj = new URL(url);
        return urlObj.origin + urlObj.pathname.replace(/\/$/, '');
    } catch (e) {
        return '';
    }
};

const appendEmbedToUrl = (url: string) => (/\/embed$/.test(url) ? url : `${url}/embed`);

export const parseSketchfabSettingsUrl = (bundle: Bundle) => {
    const rawUrl = (bundle.getBlock('url')?.value ?? '') as string;
    const embedUrl = generateSketchfabEmbedUrl(rawUrl);

    bundle.setBlockValue('url', embedUrl);
};

export const generateSketchfabEmbedUrl = (url: string) => {
    try {
        const urlWithoutParams = getUrlStringWithoutSearchParams(url);

        if (SKETCHFAB_EMBED_REGEX.test(urlWithoutParams)) {
            const modelUrl = urlWithoutParams.replace('/show/', '/models/');
            return appendEmbedToUrl(modelUrl);
        }
        const match = urlWithoutParams.match(SKETCHFAB_NEW_PREVIEW_REGEX);
        if (match) {
            const id = match?.groups?.id;
            return `https://sketchfab.com/models/${id}/embed`;
        }

        throw 'Unsupported Sketchfab URL';
    } catch (e) {
        return '';
    }
};
