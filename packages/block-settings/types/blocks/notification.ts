/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseBlock } from './base';

export enum NotificationStyle {
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

export enum NotificationBlockDividerPosition {
    Top = 'Top',
    Bottom = 'Bottom',
    Both = 'Both',
    None = 'None',
}

export type NotificationBlock = {
    type: 'notification';
    title?: string;
    text?: string;
    style: NotificationStyle;
    link?: Link;
    styles?: {
        divider?: NotificationBlockDividerPosition;
    };
} & BaseBlock;
