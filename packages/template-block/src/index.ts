/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { TemplateBlock } from './TemplateBlock';
import { settings } from './settings';

export default defineBlock({
    block: TemplateBlock,
    settings,
});
