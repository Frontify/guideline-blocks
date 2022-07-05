/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownProps, InputLabelProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormDropdownProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    DropdownProps,
    'activeItemId' | 'validation' | 'onChange'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<DropdownProps['activeItemId'], TFieldValues>;
    };
