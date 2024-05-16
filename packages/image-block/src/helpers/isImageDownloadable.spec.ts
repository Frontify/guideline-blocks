/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { isImageDownloadable } from './isImageDownloadable';
import { Security } from '@frontify/guideline-blocks-settings';
import { AssetDummy } from '@frontify/app-bridge';

describe('isImageDownloadable', () => {
    it('return false if the image is download protected', () => {
        expect(
            isImageDownloadable(Security.Global, true, true, { ...AssetDummy.with(1), isDownloadProtected: true })
        ).toEqual(false);
    });

    it('return true if the image is not download protected', () => {
        expect(
            isImageDownloadable(Security.Global, true, true, { ...AssetDummy.with(1), isDownloadProtected: false })
        ).toEqual(true);
    });
});
