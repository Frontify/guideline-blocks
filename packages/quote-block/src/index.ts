/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { QuoteBlock } from './QuoteBlock';
import { settings } from './settings';

export default defineBlock({
    block: QuoteBlock,
    settings,
});
