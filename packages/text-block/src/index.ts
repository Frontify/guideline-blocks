/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { TextBlock } from './TextBlock';

export default defineBlock({
    block: TextBlock,
    settings,
});
