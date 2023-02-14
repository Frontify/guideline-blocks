/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { PressKitBlock } from './PressKitBlock';
import { settings } from './settings';

export default defineBlock({
    block: PressKitBlock,
    settings,
});
