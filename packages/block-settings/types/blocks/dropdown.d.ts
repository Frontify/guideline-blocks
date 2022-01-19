/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize } from '@frontify/arcade';
import { ChoicesType } from './choices';

export type DropdownBlock = {
    type: 'dropdown';
    disabled?: boolean;
    placeholder?: string;
    size?: DropdownSize;
} & ChoicesType;
