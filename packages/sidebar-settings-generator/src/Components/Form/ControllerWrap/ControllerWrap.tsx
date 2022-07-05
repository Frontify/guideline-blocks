/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormControl, FormControlStyle } from '@frontify/fondue';
import { Controller, FieldValues } from 'react-hook-form';
import { useFormContext } from '../Context';
import { FormControllerWrapProps } from './types';

export const FormControllerWrap = <TFieldValues extends FieldValues>({
    name,
    disabled,
    label,
    helper,
    style,
    children,
    direction,
    extra,
    autoError = true,
}: FormControllerWrapProps<TFieldValues>) => {
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller
            control={control}
            name={name}
            render={(state) => {
                const displayError = autoError && state.fieldState.error;
                const errorHelper = displayError ? { text: state.fieldState.error?.message ?? '' } : null;

                return (
                    <FormControl
                        disabled={disabled}
                        direction={direction}
                        extra={extra}
                        name={name}
                        helper={errorHelper ?? helper}
                        label={label}
                        style={displayError ? FormControlStyle.Danger : style}
                    >
                        {children(state)}
                    </FormControl>
                );
            }}
        />
    );
};
