/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/fondue';
import { BaseBlock, ValueOrPromisedValue } from './base';

export type Choice = {
    label?: string | number;
    icon?: IconEnum;
    value: string | number;
};

export type ChoicesType = {
    choices: ValueOrPromisedValue<Choice[]>;
} & BaseBlock<string | number>;
