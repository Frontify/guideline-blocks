/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps, TextInputProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormTextInputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    TextInputProps,
    'value' | 'validation' | 'onChange' | 'onClear'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<TextInputProps['value'], TFieldValues>;
    };
