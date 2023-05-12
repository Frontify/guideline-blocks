/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Custom1Plugin,
    Custom2Plugin,
    Custom3Plugin,
    Heading1Plugin,
    Heading2Plugin,
    Heading3Plugin,
    Heading4Plugin,
    ImageCaptionPlugin,
    ImageTitlePlugin,
    QuotePlugin,
} from '.';

export const AllTextStylePlugins = [
    new Heading1Plugin(),
    new Heading2Plugin(),
    new Heading3Plugin(),
    new Heading4Plugin(),
    new Custom1Plugin(),
    new Custom2Plugin(),
    new Custom3Plugin(),
    new ImageCaptionPlugin(),
    new ImageTitlePlugin(),
    new QuotePlugin(),
];

export const TextStylePluginsWithoutImage = [
    new Heading1Plugin(),
    new Heading2Plugin(),
    new Heading3Plugin(),
    new Heading4Plugin(),
    new Custom1Plugin(),
    new Custom2Plugin(),
    new Custom3Plugin(),
    new QuotePlugin(),
];
