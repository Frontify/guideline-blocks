/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum, TextInputType } from '@frontify/fondue';
import { Rule } from '../validation';
import { BaseBlock } from './base';

export type InputBlock = {
    type: 'input';
    icon?: IconEnum;
    inputType?: TextInputType;
    placeholder?: string;
    clearable?: boolean;
    rules?: Rule<string>[];
} & BaseBlock<string>;
