/* (c) Copyright Frontify Ltd., all rights reserved. */

import { relativeUrlRegex, telOrMailRegex, urlRegex } from '../components/RichTextEditor/plugins/LinkPlugin/utils';

export const addHttps = (url: string) => {
    if (urlRegex.test(url) && !url.startsWith('http') && !telOrMailRegex.test(url) && !relativeUrlRegex.test(url)) {
        return `https://${url}`;
    }
    return url;
};
