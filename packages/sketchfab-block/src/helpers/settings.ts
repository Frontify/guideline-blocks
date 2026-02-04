/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Bundle } from '@frontify/guideline-blocks-settings';

import { generateSketchfabEmbedUrl } from './url';

export const parseSketchfabSettingsUrl = (bundle: Bundle) => {
    const rawUrl = (bundle.getBlock('url')?.value ?? '') as string;
    const embedUrl = generateSketchfabEmbedUrl(rawUrl);

    bundle.setBlockValue('url', embedUrl);
};
