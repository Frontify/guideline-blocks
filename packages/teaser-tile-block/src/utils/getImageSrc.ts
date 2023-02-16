/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

export const getImageSrc = (asset: Asset) => asset?.genericUrl.replace('{width}', `${800 * window.devicePixelRatio}`);
