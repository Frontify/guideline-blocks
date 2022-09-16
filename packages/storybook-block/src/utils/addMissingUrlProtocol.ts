/* (c) Copyright Frontify Ltd., all rights reserved. */

export const addMissingUrlProtocol = (testUrl: string) => {
    const protocolPattern = /^(ht)tps?:\/\//i;
    const url = testUrl.trim();
    if (!protocolPattern.test(url)) {
        return `https://${url}`;
    }
    return url;
};
