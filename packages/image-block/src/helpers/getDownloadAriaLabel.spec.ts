/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { getDownloadAriaLabel } from './getDownloadAriaLabel';

describe('getDownloadAriaLabel', () => {
    const cases = [
        {
            description: 'should use title when hasAssetViewer is true',
            hasAssetViewer: true,
            hasLink: false,
            title: 'My Title',
            altText: 'Alt Text',
            expected: 'Download My Title',
        },
        {
            description: 'should use title when hasLink is true',
            hasAssetViewer: false,
            hasLink: true,
            title: 'My Title',
            altText: 'Alt Text',
            expected: 'Download My Title',
        },
        {
            description: 'should use altText when both hasAssetViewer and hasLink are false',
            hasAssetViewer: false,
            hasLink: false,
            title: 'My Title',
            altText: 'Alt Text',
            expected: 'Download Alt Text',
        },
        {
            description: 'should fallback to "Download image" if altText is undefined and no viewer or link',
            hasAssetViewer: false,
            hasLink: false,
            title: 'My Title',
            altText: undefined,
            expected: 'Download image',
        },
        {
            description: 'should fallback to "Download image" if altText is empty and no viewer or link',
            hasAssetViewer: false,
            hasLink: false,
            title: 'My Title',
            altText: '',
            expected: 'Download image',
        },
        {
            description: 'should fallback to "Download image" if title is missing and viewer is present',
            hasAssetViewer: true,
            hasLink: false,
            title: undefined,
            altText: 'Alt Text',
            expected: 'Download image',
        },
    ];

    test.each(cases)('$description', ({ hasAssetViewer, hasLink, altText, title, expected }) => {
        expect(getDownloadAriaLabel(hasAssetViewer, hasLink, altText, title)).toBe(expected);
    });
});
