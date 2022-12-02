/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { JiraBlock } from './JiraBlock';
import { settings } from './settings';

export default defineBlock({
    block: JiraBlock,
    settings,
});
