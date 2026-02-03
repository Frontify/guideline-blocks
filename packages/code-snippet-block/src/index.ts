/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { CodeSnippetBlock } from './CodeSnippetBlock';
import { settings } from './settings';

export default defineBlock({
    block: CodeSnippetBlock,
    settings,
});
