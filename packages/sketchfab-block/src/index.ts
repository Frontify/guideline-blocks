/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { SketchfabBlock } from './SketchfabBlock';
import { settings } from './settings';

export default defineBlock({
    block: SketchfabBlock,
    settings,
});
