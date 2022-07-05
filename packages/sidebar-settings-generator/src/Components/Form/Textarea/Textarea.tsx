/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Textarea, useMemoizedId } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { chain } from '../../../Utilities/chain';
import { FormControllerWrap } from '../ControllerWrap';
import { FormTextareaProps } from './types';

export const FormTextarea = <T extends FieldValues>({
    id,
    name,
    helper,
    extra,
    label,
    style,
    disabled,
    required,
    decorator,
    placeholder,
    onBlur,
    autoError,
    transformers,
}: FormTextareaProps<T>) => {
    const memoId = useMemoizedId(id);

    return (
        <FormControllerWrap
            name={name}
            helper={helper}
            extra={extra}
            autoError={autoError}
            label={{ ...label, htmlFor: memoId }}
            style={style}
            disabled={disabled}
        >
            {({ field }) => (
                <Textarea
                    id={memoId}
                    onInput={(value) => field.onChange(transformers?.out ? transformers.out(value) : value)}
                    onBlur={chain(onBlur, field.onBlur)}
                    required={required}
                    placeholder={placeholder}
                    decorator={decorator}
                    value={transformers?.in ? transformers.in(field.value) : field.value}
                />
            )}
        </FormControllerWrap>
    );
};
