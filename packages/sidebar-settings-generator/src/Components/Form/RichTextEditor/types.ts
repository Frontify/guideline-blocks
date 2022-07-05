/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps, RichTextEditorProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormRichTextEditorProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    RichTextEditorProps,
    'value' | 'validation' | 'onTextChange'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        transformers?: Transformers<RichTextEditorProps['value'], TFieldValues>;
    };
