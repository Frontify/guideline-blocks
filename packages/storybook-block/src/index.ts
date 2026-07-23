/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { StorybookBlock } from './StorybookBlock';

export default defineBlock({
    block: StorybookBlock,
    settings,
});
