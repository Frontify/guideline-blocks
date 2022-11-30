/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StorybookBlock } from './StorybookBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

export default defineBlock({
    block: StorybookBlock,
    settings,
});
