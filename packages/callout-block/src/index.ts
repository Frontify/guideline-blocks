/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { CalloutBlock } from './CalloutBlock';
import { settings } from './settings';

export default defineBlock({
    block: CalloutBlock,
    settings,
});
