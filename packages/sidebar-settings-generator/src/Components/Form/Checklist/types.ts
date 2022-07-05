/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChecklistProps, InputLabelProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormChecklistProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    ChecklistProps,
    'activeValues' | 'setActiveValues'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<ChecklistProps['activeValues'], TFieldValues>;
    };
