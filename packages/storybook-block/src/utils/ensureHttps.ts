/* (c) Copyright Frontify Ltd., all rights reserved. */

export const ensureHttps = (testUrl: string) => {
    if (testUrl.startsWith('http://')) {
        return testUrl.replace('http://', 'https://');
    } else if (testUrl.startsWith('//')) {
        return testUrl.replace('//', 'https://');
    } else if (!testUrl.startsWith('https://')) {
        return `https://${testUrl}`;
    }
    return testUrl;
};
