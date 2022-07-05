/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput, TextInputBaseProps, TextInputType, useMemoizedId } from '@frontify/fondue';
import { chain } from 'Client/Utility/chain';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormTextInputProps } from './types';

export const FormTextInput = <T extends FieldValues>({
    name,
    id,
    clearable,
    copyable,
    decorator,
    disabled,
    dotted,
    placeholder,
    type,
    readonly,
    required,
    obfuscated,
    autocomplete,
    size,
    spellcheck,
    style,
    autoError,
    helper,
    extra,
    label,
    onBlur,
    onEnterPressed,
    transformers,
}: FormTextInputProps<T>) => {
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
            {({ field }) => {
                const sharedProps: TextInputBaseProps = {
                    value: transformers?.in ? transformers.in(field.value) : field.value,
                    onChange: (value) => field.onChange(transformers?.out ? transformers.out(value) : value),
                    onBlur: chain(onBlur, field.onBlur),
                    onClear: () => field.onChange(transformers?.out ? transformers.out('') : ''),
                    onEnterPressed,
                    id,
                    clearable,
                    copyable,
                    decorator,
                    disabled,
                    dotted,
                    placeholder,
                    readonly,
                    required,
                    autocomplete,
                    size,
                    spellcheck,
                };
                if (type === TextInputType.Password) {
                    return <TextInput {...sharedProps} type={TextInputType.Password} obfuscated={obfuscated} />;
                }
                return <TextInput {...sharedProps} type={type} />;
            }}
        </FormControllerWrap>
    );
};
