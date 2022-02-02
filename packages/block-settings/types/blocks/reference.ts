/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';

export enum ReferenceStyleType {
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

export enum ReferenceBlockDividerPosition {
    Top = 'Top',
    Bottom = 'Bottom',
    Both = 'Both',
    None = 'None',
}

export type ReferenceBlock = {
    type: 'reference';
    title?: string;
    text?: string;
    link?: Link;
    styles: {
        type: ReferenceStyleType;
        divider?: ReferenceBlockDividerPosition;
    };
} & BaseBlock;
