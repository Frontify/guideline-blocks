/* (c) Copyright Frontify Ltd., all rights reserved. */

import { relativeUrlRegex, telOrMailRegex, urlRegexWithHttps } from '.';

export const isValidUrl = (url: string): boolean => {
    return urlRegexWithHttps.test(url) || relativeUrlRegex.test(url) || telOrMailRegex.test(url);
};
