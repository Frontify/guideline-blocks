/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemStyle } from '@frontify/fondue';
import { JSX } from 'react';

export type FlyoutToolbarItem = {
    title: string;
    onClick: () => void;
    icon: JSX.Element;
    style?: MenuItemStyle;
};
