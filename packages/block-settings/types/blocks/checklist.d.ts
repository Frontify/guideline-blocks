import { BaseBlock } from './base';
import { Checkbox } from './checkbox';

export type ChecklistBlock = {
    type: 'checklist';
    choices: Checkbox[];
    value?: string[] | null;
    defaultValue: string[];
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock;
