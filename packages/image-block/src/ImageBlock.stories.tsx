/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Security } from '@frontify/guideline-blocks-settings';
import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { Autosizing, BorderStyle, CaptionPosition, ImageAspectRatio, Padding, Ratio } from './types';

import definition from './index';

export default { title: 'Blocks/Image', ...blockMeta(definition) };

const name = JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Key visual — Indigo horizon' }] }]);
const description = JSON.stringify([
    {
        type: 'imageCaption',
        children: [{ text: 'Use the key visual as the hero image on campaign landing pages and social headers.' }],
    },
]);

const withImage = { appBridge: { blockAssets: { [IMAGE_ID]: [AssetFixture.image(0)] } } };

export const Empty: BlockStory = {};

export const WithCaption: BlockStory = {
    args: { name, description },
    parameters: withImage,
};

export const CaptionRight: BlockStory = {
    args: { name, description, positioning: CaptionPosition.Right, ratio: Ratio.Ratio1To1 },
    parameters: { appBridge: { blockAssets: { [IMAGE_ID]: [AssetFixture.image(2)] } } },
};

export const FramedSquare: BlockStory = {
    args: {
        name,
        ratioChoice: ImageAspectRatio.Ratio1To1,
        autosizing: Autosizing.Fit,
        hasBackground: true,
        backgroundColor: { red: 241, green: 243, blue: 249, alpha: 1 },
        paddingChoice: Padding.Medium,
        hasBorder: true,
        borderWidth: '1px',
        borderStyle: BorderStyle.Solid,
    },
    parameters: { appBridge: { blockAssets: { [IMAGE_ID]: [AssetFixture.image(5)] } } },
};

export const DownloadableWithAttachments: BlockStory = {
    args: { name, description, security: Security.Custom, downloadable: true },
    parameters: {
        appBridge: {
            blockAssets: { [IMAGE_ID]: [AssetFixture.image(1)], [ATTACHMENTS_ASSET_ID]: AssetFixture.images(2, 4100) },
        },
    },
};
