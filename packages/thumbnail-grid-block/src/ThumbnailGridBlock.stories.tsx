/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { CaptionPosition, type Thumbnail } from './types';

import definition from './index';

export default { title: 'Blocks/Thumbnail Grid', ...blockMeta(definition) };

const heading = (text: string) => JSON.stringify([{ type: 'heading3', children: [{ text }] }]);
const paragraph = (text: string) => JSON.stringify([{ type: 'p', children: [{ text }] }]);

const ITEMS: Thumbnail[] = [
    {
        id: 'thumbnail-1',
        title: heading('Hero imagery'),
        description: paragraph('Wide, calm compositions with plenty of negative space for headlines.'),
    },
    {
        id: 'thumbnail-2',
        title: heading('Warm accents'),
        description: paragraph('Use sparingly to draw attention to calls to action.'),
    },
    {
        id: 'thumbnail-3',
        title: heading('Portrait crops'),
        description: paragraph('For people and product close-ups on mobile layouts.'),
    },
    {
        id: 'thumbnail-4',
        title: heading('Square tiles'),
        description: paragraph('Social posts and avatars always use a 1:1 crop.'),
    },
    {
        id: 'thumbnail-5',
        title: heading('Gradients'),
        description: paragraph('Backgrounds may blend two brand colours at most.'),
    },
    {
        id: 'thumbnail-6',
        title: heading('Panoramas'),
        description: paragraph('Reserved for event banners and website headers.'),
    },
];

const itemAssets = Object.fromEntries(ITEMS.map((item, index) => [item.id, [AssetFixture.image(index, 5000 + index)]]));

const withItems = { appBridge: { blockAssets: itemAssets } };

export const Empty: BlockStory = {};

export const CaptionRight: BlockStory = {
    args: { items: ITEMS },
    parameters: withItems,
};

export const CaptionBelowFourColumns: BlockStory = {
    args: { items: ITEMS, columnCount: '4', imagePosition: CaptionPosition.Below, imageWidthPreset: '50%' },
    parameters: withItems,
};

export const FramedTwoColumns: BlockStory = {
    args: {
        items: ITEMS.slice(0, 4),
        columnCount: '2',
        imagePosition: CaptionPosition.Left,
        imageWidthPreset: '33%',
        hasBackground: true,
        backgroundColor: { red: 241, green: 243, blue: 249, alpha: 1 },
        hasBorder: true,
        borderWidth: '1px',
        hasRadius: true,
        radiusValue: '8px',
    },
    parameters: withItems,
};
