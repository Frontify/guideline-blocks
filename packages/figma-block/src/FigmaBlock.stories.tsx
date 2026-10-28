/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { ASSET_ID } from './settings';
import { HeightChoices } from './types';

import definition from './index';

export default { title: 'Blocks/Figma', ...blockMeta(definition) };

// The image preview only needs the asset's preview image; the live preview would embed figma.com.
const figmaFrame = {
    ...AssetFixture.image(0, 5001),
    title: 'Brand components — Buttons',
    objectType: 'URL',
    externalUrl: 'https://www.figma.com/file/0000000000000000000000/Brand-components',
};

const withFigmaFrame = { appBridge: { blockAssets: { [ASSET_ID]: [figmaFrame] } } };

export const Empty: BlockStory = {};

export const ImagePreview: BlockStory = {
    parameters: withFigmaFrame,
};

export const LargeWithBackground: BlockStory = {
    args: {
        heightChoice: HeightChoices.Large,
        hasBackground: true,
        backgroundColor: { red: 241, green: 241, blue: 241, alpha: 1 },
    },
    parameters: withFigmaFrame,
};

export const BorderedWithoutLink: BlockStory = {
    args: {
        hasBorder: true,
        borderWidth: '2px',
        borderStyle: 'dashed',
        borderColor: { red: 79, green: 70, blue: 229, alpha: 1 },
        showFigmaLink: false,
        hasLimitedOptions: false,
    },
    parameters: withFigmaFrame,
};
