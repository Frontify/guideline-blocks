/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { ExampleAssetUploadBlock } from './ExampleAssetUploadBlock';
import { settings } from './settings';

export default defineBlock({
    block: ExampleAssetUploadBlock,
    settings,
});
