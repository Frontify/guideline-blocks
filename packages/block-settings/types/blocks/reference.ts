/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';

export enum ReferenceStyle {
    Warning = 'Warning',
    Negative = 'Negative',
    Positive = 'Positive',
    Info = 'Info',
}

export type Link = {
    label?: string;
    href: string;
    target?: '_self' | '_blank';
};

export type ReferenceBlock = {
    type: 'reference';
    title?: string;
    text?: string;
    style: ReferenceStyle;
    link?: Link;
    value?: undefined;
} & BaseBlock;
