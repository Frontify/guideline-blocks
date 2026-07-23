/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { settings } from './settings';
import { ThumbnailGridBlock } from './ThumbnailGridBlock';

export default defineBlock({
    block: ThumbnailGridBlock,
    settings,
});
