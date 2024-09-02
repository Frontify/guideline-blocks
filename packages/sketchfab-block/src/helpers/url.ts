/* (c) Copyright Frontify Ltd., all rights reserved. */

/* Sketchfab's model preview url used to be the same as the embed url (without "/embed").
    OLD: https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec
    NEW: https://sketchfab.com/3d-models/name-of-model-442c548d94744641ba279ae94b5f45ec
    EMBED: https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed
    We support both types of url and transform to the iframe embed url using 'generateSketchfabEmbedUrl'*/
const SKETCHFAB_NEW_PREVIEW_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/3d-models\/(\w|-)+-(\w+)/;
const SKETCHFAB_OLD_PREVIEW_REGEX = /^https:\/\/(www\.)?sketchfab\.com\/(models|show)\/\w+(\/embed)?/;

export const isParseableSketchfabUrl = (url: string) =>
    !!url && (SKETCHFAB_NEW_PREVIEW_REGEX.test(url) || SKETCHFAB_OLD_PREVIEW_REGEX.test(url));

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
    } catch (error) {
        return '';
    }
};

const appendEmbedToUrl = (url: string) => (/\/embed$/.test(url) ? url : `${url}/embed`);

export const generateSketchfabEmbedUrl = (url: string) => {
    try {
        const urlWithoutParams = getUrlStringWithoutSearchParams(url);

        if (SKETCHFAB_OLD_PREVIEW_REGEX.test(urlWithoutParams)) {
            const modelUrl = urlWithoutParams.replace('/show/', '/models/');
            return appendEmbedToUrl(modelUrl);
        }
        const match = urlWithoutParams.match(SKETCHFAB_NEW_PREVIEW_REGEX);
        if (match) {
            const id = match?.groups?.id;
            return `https://sketchfab.com/models/${id}/embed`;
        }

        throw 'Unsupported Sketchfab URL';
    } catch (error) {
        return '';
    }
};
