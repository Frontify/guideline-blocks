/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { BlockMode, DoDontImageHeight, DoDontStyle, DoDontType, ImageFitChoice, type Item } from './types';

import definition from './index';

export default { title: "Blocks/Do's & Don'ts", ...blockMeta(definition) };

const body = (text: string) => JSON.stringify([{ type: 'p', children: [{ text }] }]);

const items: Item[] = [
    {
        id: 'do-1',
        type: DoDontType.Do,
        title: 'Give the logo room to breathe',
        body: body('Keep a clear space of at least the height of the logomark on every side.'),
        alt: 'Logo with generous clear space',
    },
    {
        id: 'dont-1',
        type: DoDontType.Dont,
        title: 'Crowd the logo',
        body: body('Never place text, icons or other logos inside the clear space.'),
        alt: 'Logo crowded by surrounding elements',
    },
    {
        id: 'do-2',
        type: DoDontType.Do,
        title: 'Use approved colour pairings',
        body: body('Place the logo on white, brand indigo or a sufficiently dark photo.'),
        alt: 'Logo on an approved background',
    },
    {
        id: 'dont-2',
        type: DoDontType.Dont,
        title: 'Recolour the logo',
        body: body('Do not apply gradients, outlines or off-palette colours to the logo.'),
        alt: 'Logo recoloured with a gradient',
    },
];

const itemImages = {
    appBridge: {
        blockAssets: Object.fromEntries(
            items.map((item, index) => [item.id, [AssetFixture.image(index, 4000 + index)]])
        ),
    },
};

export const Empty: BlockStory = {};

export const TextOnly: BlockStory = {
    args: { items },
};

export const WithImages: BlockStory = {
    args: { items, mode: BlockMode.TEXT_AND_IMAGE },
    parameters: itemImages,
};

export const UnderlineThreeColumns: BlockStory = {
    args: {
        items: [...items, { ...items[0], id: 'do-3' }, { ...items[1], id: 'dont-3' }],
        style: DoDontStyle.Underline,
        columns: '3',
    },
};

export const CustomColorsImageFit: BlockStory = {
    args: {
        items,
        mode: BlockMode.TEXT_AND_IMAGE,
        imageDisplay: ImageFitChoice.FIT,
        imageHeightChoice: DoDontImageHeight.Large,
        hasCustomDoColor: true,
        doColor: { red: 79, green: 70, blue: 229, alpha: 1 },
        hasCustomDontColor: true,
        dontColor: { red: 219, green: 39, blue: 119, alpha: 1 },
    },
    parameters: itemImages,
};
