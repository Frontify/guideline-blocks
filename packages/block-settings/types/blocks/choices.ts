/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { BaseBlock } from './base';

export type Choice = {
    label?: string | number;
    icon?: IconEnum;
    value: string | number;
};

export type ChoicesType = {
    choices: Choice[];
    value?: string | number;
    defaultValue: string | number;
} & BaseBlock;
