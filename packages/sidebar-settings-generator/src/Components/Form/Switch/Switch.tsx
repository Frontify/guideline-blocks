/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Switch } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormSwitchProps } from './types';

export const FormSwitch = <T extends FieldValues>({
    name,
    helper,
    extra,
    label,
    style,
    disabled,
    id,
    size,
    hug,
    tooltip,
    autoError,
    transformers,
}: FormSwitchProps<T>) => (
    <FormControllerWrap
        name={name}
        autoError={autoError}
        helper={helper}
        extra={extra}
        style={style}
        disabled={disabled}
    >
        {({ field }) => (
            <Switch
                label={label}
                on={transformers?.in ? Boolean(transformers.in(field.value)) : Boolean(field.value)}
                onChange={() =>
                    field.onChange(transformers?.out ? transformers.out(!Boolean(field.value)) : !Boolean(field.value))
                }
                id={id}
                size={size}
                name={name}
                hug={hug}
                tooltip={tooltip}
            />
        )}
    </FormControllerWrap>
);
