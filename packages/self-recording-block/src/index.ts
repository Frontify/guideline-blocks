/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { SelfRecordingBlock } from './SelfRecordingBlock';
import { settings } from './settings';

export default defineBlock({
    block: SelfRecordingBlock,
    settings,
});
