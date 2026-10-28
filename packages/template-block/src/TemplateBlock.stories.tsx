/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TemplateDummy } from '@frontify/app-bridge/testing';
import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { TEMPLATE_BLOCK_SETTING_ID } from './constants';
import { PreviewType, TextPositioningType } from './types';

import definition from './index';

export default { title: 'Blocks/Template', ...blockMeta(definition) };

const coverImage = AssetFixture.image(0);
const pageImage = AssetFixture.image(5);

const template = {
    ...TemplateDummy.with(7001),
    name: 'Social media announcement',
    description: 'A 1080 × 1080 post with headline, image and logo lockup.',
    previewUrl: coverImage.previewUrl,
    pages: [
        { previewUrl: coverImage.previewUrl, width: coverImage.width ?? 0, height: coverImage.height ?? 0 },
        { previewUrl: pageImage.previewUrl, width: pageImage.width ?? 0, height: pageImage.height ?? 0 },
    ],
};

const title = JSON.stringify([{ type: 'heading3', children: [{ text: 'Social media announcement' }] }]);
const description = JSON.stringify([
    { type: 'p', children: [{ text: 'Start from the approved layout and swap in your own headline and photo.' }] },
]);

const withTemplate = { appBridge: { blockTemplates: { [TEMPLATE_BLOCK_SETTING_ID]: [template] } } };

export const Empty: BlockStory = {};

export const WithTemplate: BlockStory = {
    args: { title, description },
    parameters: withTemplate,
};

export const TextBelowWithPageCount: BlockStory = {
    args: { title, description, textPositioning: TextPositioningType.Bottom, hasPageCount: true },
    parameters: withTemplate,
};

export const CustomPreview: BlockStory = {
    args: { title, description, preview: PreviewType.Custom },
    parameters: {
        appBridge: {
            blockTemplates: { [TEMPLATE_BLOCK_SETTING_ID]: [template] },
            blockAssets: { previewCustom: [AssetFixture.image(3)] },
        },
    },
};

export const WithoutPreview: BlockStory = {
    args: { title, description, preview: PreviewType.None },
    parameters: withTemplate,
};
