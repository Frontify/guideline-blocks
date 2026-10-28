/* (c) Copyright Frontify Ltd., all rights reserved. */

// Block packages type-check stories (and therefore this file) without Vite's ambient asset types.
/// <reference types="vite/client" />

import { type Asset } from '@frontify/app-bridge';
import { AssetDummy } from '@frontify/app-bridge/testing';

import sampleAudioUrl from './sample-audio.mp3';
import sampleDoIconUrl from './sample-do-icon.svg';
import sampleDontIconUrl from './sample-dont-icon.svg';
import sampleIconUrl from './sample-icon.svg';
import sampleImage1Url from './sample-image-1.jpg';
import sampleImage2Url from './sample-image-2.jpg';
import sampleImage3Url from './sample-image-3.jpg';
import sampleImage4Url from './sample-image-4.jpg';
import sampleImage5Url from './sample-image-5.jpg';
import sampleImage6Url from './sample-image-6.jpg';
import sampleQuoteIconUrl from './sample-quote-icon.svg';

const withUrl = (asset: Asset, url: string): Asset => ({
    ...asset,
    genericUrl: url,
    previewUrl: url,
    originUrl: url,
});

/**
 * Frontify image URLs always carry a query with a `{width}` placeholder; blocks replace it and append
 * further params (`&format=webp`), so a bare file URL would 404. Static servers ignore the query.
 */
const withImageUrl = (asset: Asset, url: string): Asset => withUrl(asset, `${url}?width={width}`);

const SAMPLE_IMAGES = [
    { url: sampleImage1Url, width: 1600, height: 1000, title: 'Indigo horizon' },
    { url: sampleImage2Url, width: 1600, height: 1000, title: 'Sunset blend' },
    { url: sampleImage3Url, width: 900, height: 1200, title: 'Forest portrait' },
    { url: sampleImage4Url, width: 1000, height: 1000, title: 'Citrus square' },
    { url: sampleImage5Url, width: 1000, height: 1000, title: 'Violet square' },
    { url: sampleImage6Url, width: 1600, height: 900, title: 'Ocean wide' },
] as const;

const svg = (id: number, title: string, fileName: string, url: string): Asset =>
    withImageUrl({ ...AssetDummy.with(id), title, fileName, extension: 'svg', width: 24, height: 24 }, url);

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
    svgIcon: (id = 1002): Asset => svg(id, 'Check icon', 'check.svg', sampleIconUrl),
    doIcon: (id = 1003): Asset => svg(id, 'Do icon', 'do.svg', sampleDoIconUrl),
    dontIcon: (id = 1004): Asset => svg(id, "Don't icon", 'dont.svg', sampleDontIconUrl),
    quoteIcon: (id = 1005): Asset => svg(id, 'Quote icon', 'quote.svg', sampleQuoteIconUrl),
    /** One of six distinct sample images: 0–1 landscape, 2 portrait, 3–4 square, 5 wide. */
    image: (variant = 0, id = 2000 + variant): Asset => {
        const { url, width, height, title } = SAMPLE_IMAGES[variant % SAMPLE_IMAGES.length];
        const fileName = `${title.toLowerCase().replaceAll(/\s+/g, '-')}.jpg`;
        return withImageUrl({ ...AssetDummy.with(id), title, fileName, extension: 'jpg', width, height }, url);
    },
    /** `count` different images with unique ids, cycling through the sample images. */
    images: (count: number, firstId = 3000): Asset[] =>
        Array.from({ length: count }, (_, index) => AssetFixture.image(index, firstId + index)),
};
