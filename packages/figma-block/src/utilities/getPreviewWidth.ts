/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getDevicePixelRatio } from '@frontify/guideline-blocks-shared';

// Zooming in on a frame only stays sharp if there are more pixels than the block shows.
const MIN_ZOOMABLE_WIDTH = 2560;

export const getPreviewWidth = (blockWidth: number, isZoomable: boolean) => {
    const devicePixelRatio = getDevicePixelRatio();
    const blockPixelWidth = Math.ceil(blockWidth * devicePixelRatio);

    if (!isZoomable) {
        return blockPixelWidth;
    }

    return Math.max(blockPixelWidth, Math.ceil(window.screen.width * devicePixelRatio), MIN_ZOOMABLE_WIDTH);
};
