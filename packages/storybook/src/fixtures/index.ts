/* (c) Copyright Frontify Ltd., all rights reserved. */

// Block packages type-check stories (and therefore this file) without Vite's ambient asset types.
/// <reference types="vite/client" />

import { type Asset } from '@frontify/app-bridge';
import { AssetDummy } from '@frontify/app-bridge/testing';

import sampleAudioUrl from './sample-audio.mp3';
import sampleIconUrl from './sample-icon.svg';

const withUrl = (asset: Asset, url: string): Asset => ({
    ...asset,
    genericUrl: url,
    previewUrl: url,
    originUrl: url,
});

/**
 * Asset fixtures that point at real files bundled with Storybook.
 * `AssetDummy` alone uses placeholder URLs that don't resolve in a browser.
 */
export const AssetFixture = {
    audio: (id = 1001): Asset =>
        withUrl(
            {
                ...AssetDummy.with(id),
                title: 'Brand jingle',
                fileName: 'brand-jingle.mp3',
                extension: 'mp3',
                objectType: 'FILE',
            },
            sampleAudioUrl
        ),
    svgIcon: (id = 1002): Asset =>
        withUrl(
            {
                ...AssetDummy.with(id),
                title: 'Check icon',
                fileName: 'check.svg',
                extension: 'svg',
                width: 24,
                height: 24,
            },
            sampleIconUrl
        ),
};
