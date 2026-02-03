/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StorybookPosition } from '../types';

import { addMissingUrlProtocol } from './addMissingUrlProtocol';
import { isValidStorybookUrl } from './isValidStorybookUrl';

export const buildIframeUrl = (url: string, hasAddons: boolean, positioning: StorybookPosition): URL | null => {
    if (url.trim() === '' || !isValidStorybookUrl(url)) {
        return null;
    }

    const iframeUrl = new URL(addMissingUrlProtocol(url));
    iframeUrl.searchParams.set('nav', 'false');

    const positionValue = positioning === StorybookPosition.Horizontal ? 'right' : 'bottom';
    iframeUrl.searchParams.set('panel', !hasAddons ? 'false' : positionValue);

    const includesIframe = iframeUrl.pathname.toString().includes('iframe.html');
    if (!hasAddons && !includesIframe) {
        iframeUrl.pathname = `${iframeUrl.pathname}iframe.html`;
    }

    if (hasAddons && includesIframe) {
        const pathname = iframeUrl.pathname.toString().replace('iframe.html', '');
        iframeUrl.pathname = pathname;
    }

    return iframeUrl;
};
