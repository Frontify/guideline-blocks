/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput, TextInputType } from '@frontify/fondue';
import React, { useState } from 'react';
import { MetadataProps } from '../type';
import { FormUtilities } from './type';
import { FormLabel } from './FormLabel';

export const InputNumber = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
}: MetadataProps & FormUtilities) => {
    const [textInput, setTextInput] = useState<string>(defaultValue ?? '');
    const onFocus = () => {};

    const onInput = (value: string) => {
        setTextInput(value);
        onChange({ id, value });
    };

    return (
        <div>
            <FormLabel id={id} isRequired={isRequired}>
                {name}
            </FormLabel>
            <TextInput
                type={TextInputType.Number}
                id={id}
                onFocus={onFocus}
                onChange={onInput}
                onBlur={(event) => onInput(event.target.value)}
                // onEnterPressed={(event) => onChange(event.target}
                validation={validation}
                value={textInput}
            />
        </div>
    );
};
