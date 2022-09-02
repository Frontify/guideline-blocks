/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BaseBlock } from './base';
import type { Checkbox } from './checkbox';
import type { AppBridgeBlock } from '@frontify/app-bridge';

type ChoicesFn = (props: { appBridge: AppBridgeBlock }) => Promise<Checkbox[]>;

export type ChecklistBlock = {
    type: 'checklist';
    choices: Checkbox[] | ChoicesFn;
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock<string[] | null>;
