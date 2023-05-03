/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { AnimationCurveBlock } from './AnimationCurveBlock';
import { settings } from './settings';

export default defineBlock({
    block: AnimationCurveBlock,
    settings,
});
