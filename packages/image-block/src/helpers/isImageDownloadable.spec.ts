/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy } from '@frontify/app-bridge';
import { describe, expect, test } from 'vitest';

import { isImageDownloadable } from './isImageDownloadable';

describe('isImageDownloadable', () => {
    const assetBase = AssetDummy.with(1);

    const cases = [
        {
            description: 'returns false if the image is download protected',
            isDownloadableValue: true,
            image: { ...assetBase, isDownloadProtected: true },
            expected: false,
        },
        {
            description: 'returns true if the image is not download protected',
            isDownloadableValue: true,
            image: { ...assetBase, isDownloadProtected: false },
            expected: true,
        },
        {
            description: 'returns false if isDownloadableValue is false',
            isDownloadableValue: false,
            image: { ...assetBase, isDownloadProtected: false },
            expected: false,
        },
        {
            description: 'returns false if image is protected and isDownloadableValue is false',
            isDownloadableValue: false,
            image: { ...assetBase, isDownloadProtected: true },
            expected: false,
        },
        {
            description: 'returns false if image is not provided',
            isDownloadableValue: true,
            image: undefined,
            expected: false,
        },
    ];

    test.each(cases)('$description', ({ isDownloadableValue, image, expected }) => {
        expect(isImageDownloadable(isDownloadableValue, image)).toBe(expected);
    });
});
