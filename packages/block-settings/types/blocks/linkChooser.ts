/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@frontify/arcade';
import { BaseBlock } from './base';

export type LinkChooserBlock = {
    type: 'linkChooser';
    placeholder?: string;
    label?: string;
    openInNewTab?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    required?: boolean;
    validation?: Validation;
} & BaseBlock<{ link: string | null; openInNewTab: boolean | null }>;
