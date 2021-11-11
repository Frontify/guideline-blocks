/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from 'react';
import { FormControl, FormControlStyle, TextInput, TextInputType } from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { InputBlock as InputBlockType, Rule } from '../../hooks/useSettings';

const getErrorMessages = (rules: Rule<string>[], value: string) =>
    rules.filter((rule) => !rule.validate(value)).map((rule) => rule.errorMessage);

export type InputBlockProps = {
    block: InputBlockType;
    onUpdate: UpdateDataFunction<InputBlockType['value']>;
};

export const InputBlock: FC<InputBlockProps> = ({ block, onUpdate }) => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const [value, setValue] = useState(block.value ?? block.defaultValue ?? '');

    useEffect(() => {
        block.value && setValue(block.value);
    }, [block.value]);

    const handleUserSubmission = () => {
        const errorMessages = block.rules ? getErrorMessages(block.rules, value) : [];

        if (errorMessages.length === 0) {
            setErrorMessage(undefined);
            if (value !== block.value) {
                onUpdate(block.id, value);
                block.value && setValue(block.value);
            }
        } else if (errorMessages.length > 0) {
            setErrorMessage(errorMessages[0]);
        }
    };

    const onChange = (updatedValue: string) => setValue(updatedValue);
    const onClear = () => {
        setValue('');
        onUpdate(block.id, undefined);
    };

    return (
        <FormControl
            label={{
                children: block.label ?? '',
                htmlFor: block.id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
            helper={errorMessage ? { text: errorMessage } : undefined}
            style={errorMessage ? FormControlStyle.Danger : undefined}
        >
            <div data-test-id="settings-sidebar-input-block">
                <TextInput
                    id={block.id}
                    key={block.id}
                    type={block.inputType || TextInputType.Text}
                    onChange={onChange}
                    value={value}
                    onEnterPressed={handleUserSubmission}
                    onBlur={handleUserSubmission}
                    onClear={onClear}
                    placeholder={block.placeholder}
                    clearable={block.clearable}
                />
            </div>
        </FormControl>
    );
};
