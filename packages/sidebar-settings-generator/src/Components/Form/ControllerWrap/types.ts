/* (c) Copyright Frontify Ltd., all rights reserved. */
import { FormControlProps } from '@frontify/fondue';
import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    Path,
    PathValue,
    UnpackNestedValue,
    UseFormStateReturn,
} from 'react-hook-form';

export type FormControllerWrapState<
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>
> = {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
};

export type FormControllerWrapProps<TFieldValues extends FieldValues = FieldValues> = Omit<FormControlProps, 'name'> & {
    name: Path<TFieldValues>;
    autoError?: boolean;
    children: (state: FormControllerWrapState<TFieldValues>) => JSX.Element;
};

export type Transformers<TOutput, TFieldValues extends FieldValues = FieldValues> = {
    in?: (value: UnpackNestedValue<PathValue<TFieldValues, Path<TFieldValues>>>) => TOutput;
    out?: (value: TOutput) => UnpackNestedValue<PathValue<TFieldValues, Path<TFieldValues>>>;
};
