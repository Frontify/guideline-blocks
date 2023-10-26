/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { AudioBlock } from './AudioBlock';
import { settings } from './settings';

export default defineBlock({
    block: AudioBlock,
    settings,
});
