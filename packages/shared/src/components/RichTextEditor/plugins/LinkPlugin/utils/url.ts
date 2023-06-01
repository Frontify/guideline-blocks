/* (c) Copyright Frontify Ltd., all rights reserved. */

import { addHttps } from '../../../../../helpers';
import { relativeUrlRegex } from './regex';

export const isValidUrl = (url: string) => {
    if (relativeUrlRegex.test(url)) {
        return true;
    }
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const isValidUrlOrEmpty = (url: string) => {
    return isValidUrl(addHttps(url)) || url === '';
};
