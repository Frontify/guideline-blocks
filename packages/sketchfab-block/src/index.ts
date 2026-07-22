/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { SketchfabBlock } from './SketchfabBlock';

export default defineBlock({
    block: SketchfabBlock,
    settings,
});
