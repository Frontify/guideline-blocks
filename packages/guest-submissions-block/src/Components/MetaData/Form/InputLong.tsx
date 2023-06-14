/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Textarea } from '@frontify/fondue';
import React, { useState } from 'react';
import { MetadataProps } from '../type';
import { FormUtilities } from './type';
import { FormLabel } from './FormLabel';

export const InputLong = ({
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
            <Textarea
                id={id}
                onFocus={onFocus}
                onInput={onInput}
                onBlur={(value) => onInput(value)}
                // onEnterPressed={(event) => onChange(event.target}
                validation={validation}
                value={textInput}
                minRows={5}
            />
        </div>
    );
};
