/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SearchResult, Validation } from '@frontify/arcade';
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
} & BaseBlock<{ link?: SearchResult | null; openInNewTab: boolean | null }>;
