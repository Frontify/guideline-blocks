/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useRef } from 'react';
import { DebouceCatalogue, FormProps } from './types';
import { FormContext } from './Context/FormContext';
import { debounce, get } from 'lodash-es';
import { FormContextType } from './Context/types';
import { object } from 'yup';

export const Form = <T extends FieldValues>({
    onValidFieldChange,
    initialValues,
    schema = object(),
    onSubmit = () => ({}),
    children,
    keepHiddenValues = false,
    resetOnInitialValueChange = true,
}: FormProps<T>) => {
    const form = useForm<T>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: initialValues,
        shouldUnregister: !keepHiddenValues,
    });

    const debounceCatalogue = useRef<DebouceCatalogue<T>>({} as DebouceCatalogue<T>);

    const {
        watch,
        trigger,
        reset,
        formState,
        getFieldState,
        setValue,
        getValues,
        setError,
        resetField,
        clearErrors,
        control,
        handleSubmit,
    } = form;

    const validateField = useCallback(
        async (name, value, state) => {
            const isValid = await trigger(name);

            if (isValid && onValidFieldChange) {
                onValidFieldChange(name, value, state);
            }
        },
        [trigger, onValidFieldChange]
    );

    useEffect(() => {
        const catalogue = debounceCatalogue.current;

        const subscription = watch((state, { name }) => {
            if (name) {
                const debouncedValidation = debounce(validateField, 500);
                if (catalogue[name]) {
                    catalogue[name].cancel();
                }
                catalogue[name] = debouncedValidation;
                debouncedValidation(name, get(state, name), state);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, trigger, validateField]);

    useEffect(() => {
        if (resetOnInitialValueChange) {
            reset(initialValues);
        }
    }, [initialValues, reset, resetOnInitialValueChange]);

    const submitForm = handleSubmit(onSubmit);

    const contextualFormControls: FormContextType<T> = {
        formState,
        watch,
        getFieldState,
        setValue,
        getValues,
        setError,
        reset,
        resetField,
        clearErrors,
        control,
        submitForm,
    };

    return (
        <FormContext.Provider value={contextualFormControls as FormContextType}>
            <form onSubmit={submitForm}>
                {typeof children === 'function' ? children(contextualFormControls) : children}
            </form>
        </FormContext.Provider>
    );
};
