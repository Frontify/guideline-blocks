/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/fondue';
import { BaseBlock } from './base';
import { ColorInputBlock } from './colorInput';
import { DropdownBlock } from './dropdown';
import { InputBlock } from './input';

export type MultiInputBlock = {
    type: 'multiInput';
    layout: MultiInputLayout;
    blocks: (Omit<InputBlock, 'value'> | Omit<ColorInputBlock, 'value'> | Omit<DropdownBlock, 'value'>)[];
    lastItemFullWidth?: boolean;
} & BaseBlock;
