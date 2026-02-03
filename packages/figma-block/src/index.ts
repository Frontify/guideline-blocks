/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { FigmaBlock } from './FigmaBlock';
import { settings } from './settings';

export default defineBlock({
    block: FigmaBlock,
    settings,
});
