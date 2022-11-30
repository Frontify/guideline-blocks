/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { ChecklistBlock } from './ChecklistBlock';
import { settings } from './settings';

export default defineBlock({
    block: ChecklistBlock,
    settings,
});
