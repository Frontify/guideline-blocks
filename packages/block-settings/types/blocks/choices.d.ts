import { IconEnum } from '@frontify/arcade';
import { BaseBlock } from './base';

export type Choice = {
    label: string;
    icon?: IconEnum;
    value: string;
};

export type ChoicesType = {
    choices: Choice[];
    value?: string;
    defaultValue: string;
} & BaseBlock;
