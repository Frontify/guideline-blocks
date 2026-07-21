/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { UIPatternBlock } from './UIPatternBlock';

export default defineBlock({
    block: UIPatternBlock,
    settings,
});
