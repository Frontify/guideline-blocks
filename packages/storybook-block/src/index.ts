/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { StorybookBlock } from './StorybookBlock';
import { settings } from './settings';

export default defineBlock({
    block: StorybookBlock,
    settings,
});
