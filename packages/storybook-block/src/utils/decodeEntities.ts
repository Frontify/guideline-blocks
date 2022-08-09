/* (c) Copyright Frontify Ltd., all rights reserved. */

export const decodeEntities = (encodedString: string): string => {
    if (!encodedString) {
        return '';
    }
    const doc = new DOMParser().parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent || '';
};
