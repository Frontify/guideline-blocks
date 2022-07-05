/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps, TextareaProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormTextareaProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    TextareaProps,
    'value' | 'validation' | 'onInput'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<TextareaProps['value'], TFieldValues>;
    };
