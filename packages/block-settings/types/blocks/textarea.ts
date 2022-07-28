/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Rule } from '../validation';
import { BaseBlock } from './base';

export type TextareaBlock = {
    type: 'textarea';
    placeholder?: string;
    rules?: Rule<string>[];
} & BaseBlock<string>;
