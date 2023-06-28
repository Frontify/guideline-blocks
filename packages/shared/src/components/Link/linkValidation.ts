/* (c) Copyright Frontify Ltd., all rights reserved. */

const relativeUrlRegex = /^\/(document|r)\/\S+$/i;

export const addHttps = (url: string) => {
    if (relativeUrlRegex.test(url)) {
        return url;
    }
    try {
        new URL(url);
        return url;
    } catch {
        return `https://${url}`;
    }
};

export const isValidUrl = (url: string) => {
    if (relativeUrlRegex.test(url)) {
        return true;
    }
    try {
        const parsedUrl = new URL(url);
        const validProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
        return validProtocols.includes(parsedUrl.protocol) && parsedUrl.pathname !== '';
    } catch (error) {
        return false;
    }
};

export const isValidUrlOrEmpty = (url: string) => {
    return isValidUrl(addHttps(url)) || url === '';
};
