/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChoicesType } from './choices';

export type DropdownBlock = {
    type: 'dropdown';
    disabled?: boolean;
    placeholder?: string;
    size?: 'small' | 'large';
} & ChoicesType;
