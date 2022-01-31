/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';

export type TemplateInputBlock = {
    type: 'templateInput';
    multiSelection?: boolean;
} & BaseBlock<number>;
