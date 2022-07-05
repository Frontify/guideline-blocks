/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps, SliderProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormSliderProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    SliderProps,
    'activeItemId' | 'onChange'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<SliderProps['activeItemId'], TFieldValues>;
    };
