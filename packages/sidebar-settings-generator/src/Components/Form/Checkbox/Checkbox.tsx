/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxState } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormCheckboxProps } from './types';

export const FormCheckbox = <T extends FieldValues>({
    name,
    style,
    helper,
    extra,
    transformers,
    ariaLabel,
    disabled,
    label,
    autoError,
    id,
    required,
    note,
    tooltip,
    groupInputProps,
    value,
}: FormCheckboxProps<T>) => (
    <FormControllerWrap
        name={name}
        helper={helper}
        extra={extra}
        style={style}
        autoError={autoError}
        disabled={disabled}
    >
        {({ field }) => (
            <Checkbox
                state={transformers?.in ? transformers.in(field.value) : field.value}
                onChange={(value) => {
                    const state = value ? CheckboxState.Checked : CheckboxState.Unchecked;
                    field.onChange(transformers?.out ? transformers.out(state) : state);
                }}
                ariaLabel={ariaLabel}
                disabled={disabled}
                id={id}
                label={label}
                required={required}
                note={note}
                tooltip={tooltip}
                groupInputProps={groupInputProps}
                value={value}
            />
        )}
    </FormControllerWrap>
);
