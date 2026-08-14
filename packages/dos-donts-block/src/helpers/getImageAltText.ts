/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';

export const getImageAltText = (alt: string | undefined, asset: Asset): string => {
    return alt ?? (typeof asset.alternativeText === 'string' ? asset.alternativeText : '');
};
