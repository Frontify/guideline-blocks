/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { SketchfabHeight, SketchfabSettings } from './types';

import definition from './index';

export default { title: 'Blocks/Sketchfab', ...blockMeta(definition) };

// Loads the model from sketchfab.com in an iframe, so these stories need network access.
const MODEL_URL = 'https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed';

export const Empty: BlockStory = {};

export const Model: BlockStory = {
    args: { [SketchfabSettings.URL]: MODEL_URL },
};

export const SmallWithBorder: BlockStory = {
    args: {
        [SketchfabSettings.URL]: MODEL_URL,
        [SketchfabSettings.HEIGHT]: SketchfabHeight.Small,
        [SketchfabSettings.HAS_BORDER]: true,
        [SketchfabSettings.BORDER_STYLE]: BorderStyle.Solid,
        [SketchfabSettings.BORDER_WIDTH]: '2px',
        [SketchfabSettings.BORDER_COLOR]: { red: 79, green: 70, blue: 229, alpha: 1 },
        [SketchfabSettings.RADIUS_CHOICE]: Radius.Large,
    },
};

export const CustomHeightAutoSpin: BlockStory = {
    args: {
        [SketchfabSettings.URL]: MODEL_URL,
        [SketchfabSettings.IS_CUSTOM_HEIGHT]: true,
        [SketchfabSettings.CUSTOM_HEIGHT]: '360px',
        [SketchfabSettings.AUTO_SPIN]: true,
        [SketchfabSettings.AUTO_SPIN_COUNT]: '0.5',
    },
};
