/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { AssetKitBlock } from './AssetKitBlock';
import { settings } from './settings';

export default defineBlock({
    block: AssetKitBlock,
    settings,
});
