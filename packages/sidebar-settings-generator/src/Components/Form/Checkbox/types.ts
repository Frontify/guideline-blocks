/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormCheckboxProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    CheckboxProps,
    'state' | 'onChange'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        transformers?: Transformers<CheckboxProps['state'], TFieldValues>;
    };
