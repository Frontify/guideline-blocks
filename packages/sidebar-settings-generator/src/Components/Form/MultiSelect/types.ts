/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps, MultiSelectProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormMultiSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    MultiSelectProps,
    'activeItemKeys' | 'onSelectionChange'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<MultiSelectProps['activeItemKeys'], TFieldValues>;
    };
