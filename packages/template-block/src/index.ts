/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { TemplateBlock } from './TemplateBlock';

export default defineBlock({
    block: TemplateBlock,
    settings,
});
