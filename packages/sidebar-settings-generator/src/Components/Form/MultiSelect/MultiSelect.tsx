/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiSelect } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormMultiSelectProps } from './types';

export const FormMultiSelect = <T extends FieldValues>({
    name,
    disabled,
    type,
    style,
    helper,
    extra,
    label,
    items,
    ariaLabel,
    placeholder,
    autoError,
    transformers,
}: FormMultiSelectProps<T>) => (
    <FormControllerWrap
        name={name}
        helper={helper}
        extra={extra}
        label={{ ...label, htmlFor: '' }}
        style={style}
        autoError={autoError}
        disabled={disabled}
    >
        {({ field }) => (
            <MultiSelect
                type={type}
                placeholder={placeholder}
                ariaLabel={ariaLabel}
                items={items}
                disabled={disabled}
                onSelectionChange={(value) => field.onChange(transformers?.out ? transformers.out(value) : value)}
                activeItemKeys={transformers?.in ? transformers.in(field.value) : field.value ?? []}
            />
        )}
    </FormControllerWrap>
);
