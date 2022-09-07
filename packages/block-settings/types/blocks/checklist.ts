/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BaseBlock, ValueOrPromisedValue } from './base';
import type { Checkbox } from './checkbox';

export type ChecklistBlock = {
    type: 'checklist';
    choices: ValueOrPromisedValue<Checkbox[]>;
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock<string[] | null>;
