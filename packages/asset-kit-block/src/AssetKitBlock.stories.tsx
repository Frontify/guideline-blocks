/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { ASSET_SETTINGS_ID } from './settings';

import definition from './index';

export default { title: 'Blocks/Asset Kit', ...blockMeta(definition) };

const title = JSON.stringify([{ type: 'heading3', children: [{ text: 'Campaign starter kit' }] }]);
const description = JSON.stringify([
    {
        type: 'p',
        children: [{ text: 'Everything you need to launch a campaign: key visuals, social crops and icons.' }],
    },
]);

const kitAssets = [...AssetFixture.images(6, 6000), AssetFixture.svgIcon(6100), AssetFixture.quoteIcon(6101)];

const withAssets = { appBridge: { blockAssets: { [ASSET_SETTINGS_ID]: kitAssets } } };

export const Empty: BlockStory = {};

export const WithAssets: BlockStory = {
    args: { title, description },
    parameters: withAssets,
};

export const WithoutThumbnails: BlockStory = {
    args: { title, description, showThumbnails: false },
    parameters: withAssets,
};

export const CustomCountColor: BlockStory = {
    args: {
        title,
        description,
        assetCountColor: 'override',
        countCustomColor: { red: 79, green: 70, blue: 229, alpha: 1 },
        hasBackgroundBlocks: true,
        backgroundColorBlocks: { red: 241, green: 243, blue: 249, alpha: 1 },
    },
    parameters: { appBridge: { blockAssets: { [ASSET_SETTINGS_ID]: AssetFixture.images(3, 6200) } } },
};
