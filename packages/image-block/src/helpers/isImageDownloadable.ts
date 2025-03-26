/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

export const isImageDownloadable = (isDownloadableValue: boolean, image?: Asset): boolean => {
    return !!image && !image.isDownloadProtected && isDownloadableValue;
};
