/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { PersonalNoteBlock } from './PersonalNoteBlock';
import { settings } from './settings';

export default defineBlock({
    block: PersonalNoteBlock,
    settings,
});
