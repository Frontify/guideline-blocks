/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { ExampleBlock } from './ExampleBlock';
import { settings } from './settings';

export default defineBlock({
    block: ExampleBlock,
    settings,
});
