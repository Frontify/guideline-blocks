/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DebouncedFunc } from 'lodash-es';
import { ReactNode } from 'react';
import { DeepPartial, FieldValues, Path, SubmitHandler, UnpackNestedValue } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { FormContextType } from './Context/types';

export type FormProps<T extends FieldValues = FieldValues, TSchema extends ObjectSchema<any> = ObjectSchema<any>> = {
    onValidFieldChange?: (
        key: Path<T>,
        value: UnpackNestedValue<DeepPartial<T>>[Path<T>],
        state: UnpackNestedValue<DeepPartial<T>>
    ) => void;
    initialValues?: UnpackNestedValue<DeepPartial<T>>;
    schema?: TSchema;
    children: ((form: FormContextType<T>) => JSX.Element) | ReactNode;
    onSubmit?: SubmitHandler<T>;
    keepHiddenValues?: boolean;
    resetOnInitialValueChange?: boolean;
};

export type DebouceCatalogue<T extends FieldValues> = Record<
    Path<T>,
    DebouncedFunc<(name: Path<T>, value: UnpackNestedValue<DeepPartial<T>>[Path<T>]) => Promise<void>>
>;
