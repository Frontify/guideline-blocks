/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import type { BaseBlock, ValueOrPromisedValue } from './base';
import type { Checkbox } from './checkbox';

export type ChecklistBlock = {
    type: 'checklist';
    choices: ValueOrPromisedValue<Checkbox[], { appBridge: AppBridgeBlock }>;
    showClearAndSelectAllButtons?: boolean;
    columns?: 1 | 2;
} & BaseBlock<string[] | null>;
