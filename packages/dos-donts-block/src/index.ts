/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { DosDontsBlockWrapper } from './DosDontsBlock';
import { settings } from './settings';

export default defineBlock({
    block: DosDontsBlockWrapper,
    settings,
});
