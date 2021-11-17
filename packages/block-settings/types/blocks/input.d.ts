/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInputType } from '@frontify/arcade';
import { Rule } from '../validation';
import { BaseBlock } from './base';

export type InputBlock = {
    type: 'input';
    inputType?: TextInputType;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    clearable?: boolean;
    rules?: Rule<string>[];
} & BaseBlock;
