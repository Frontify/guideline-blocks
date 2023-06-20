/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { OpenAiBlock } from './OpenAiBlock';
import { settings } from './settings';

export default defineBlock({
    block: OpenAiBlock,
    settings,
});
