/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { ThumbnailGridBlock } from './ThumbnailGridBlock';
import { settings } from './settings';

export default defineBlock({
    block: ThumbnailGridBlock,
    settings,
});
