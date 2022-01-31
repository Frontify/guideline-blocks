/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';
import { Checkbox } from './checkbox';

export type ChecklistBlock = {
    type: 'checklist';
    choices: Checkbox[];
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock<string[] | null>;
