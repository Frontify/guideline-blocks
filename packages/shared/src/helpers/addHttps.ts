/* (c) Copyright Frontify Ltd., all rights reserved. */

import { relativeUrlRegex, telOrMailRegex } from '../components/RichTextEditor/plugins/LinkPlugin/utils';

export const addHttps = (url: string) => {
    if (!url.startsWith('http') && !telOrMailRegex.test(url) && !relativeUrlRegex.test(url)) {
        return `https://${url}`;
    }
    return url;
};
