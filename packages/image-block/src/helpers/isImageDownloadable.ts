/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Security, isDownloadable } from '@frontify/guideline-blocks-settings';
import { Asset } from '@frontify/app-bridge';

export const isImageDownloadable = (
    security: Security,
    downloadable: boolean,
    assetDownloadEnabled: boolean,
    image?: Asset
) => image?.isDownloadProtected === false && isDownloadable(security, downloadable, assetDownloadEnabled);
