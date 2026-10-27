/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Security } from '@frontify/guideline-blocks-settings';
import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { AUDIO_ID } from './settings';
import { TextPosition } from './types';

import definition from './index';

export default { title: 'Blocks/Audio', ...blockMeta(definition) };

const title = JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Brand jingle' }] }]);
const description = JSON.stringify([
    { type: 'imageCaption', children: [{ text: 'Use the jingle at the end of video spots and podcasts.' }] },
]);

const withAudio = { appBridge: { blockAssets: { [AUDIO_ID]: [AssetFixture.audio()] } } };

export const Empty: BlockStory = {};

export const WithAudio: BlockStory = {
    args: { title, description },
    parameters: withAudio,
};

export const TextBelow: BlockStory = {
    args: { title, description, positioning: TextPosition.Below },
    parameters: withAudio,
};

export const Downloadable: BlockStory = {
    args: { title, description, security: Security.Custom, downloadable: true },
    parameters: withAudio,
};
