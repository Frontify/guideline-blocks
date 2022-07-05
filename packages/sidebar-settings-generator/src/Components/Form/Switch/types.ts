/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SwitchProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormSwitchProps<TFieldValues extends FieldValues = FieldValues> = Omit<SwitchProps, 'on' | 'onChange'> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        transformers?: Transformers<boolean, TFieldValues>;
    };
