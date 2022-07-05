/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, ColorPickerFlyoutProps, InputLabelProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrapProps, Transformers } from '../ControllerWrap/types';

export type FormColorPickerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    ColorPickerFlyoutProps,
    'currentColor' | 'onSelect' | 'onClick' | 'onClear'
> &
    Omit<FormControllerWrapProps<TFieldValues>, 'children' | 'label' | 'direction'> & {
        label?: Omit<InputLabelProps, 'htmlFor' | 'disabled'>;
        onSelect?: (color: Color) => void;
        transformers?: Transformers<ColorPickerFlyoutProps['currentColor'], TFieldValues>;
    };
