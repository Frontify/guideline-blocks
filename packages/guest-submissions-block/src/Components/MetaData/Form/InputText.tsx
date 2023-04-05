import { Text, TextInput } from "@frontify/fondue";
import React, { useState } from "react";
import { MetadataProps } from "../type";
import { FormUtilities } from "./type";

export const InputText = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
    valueType: { propertyType, options },
}: MetadataProps & FormUtilities) => {
    const [textInput, setTextInput] = useState<string>(defaultValue ?? "");
    const onFocus = () => {};

    const onInput = (value: string) => {
        setTextInput(value);
        onChange({ id, value });
    };

    return (
        <>
            <Text as="label">
                {name} {isRequired && "*"}
            </Text>
            <TextInput
                id={id}
                onFocus={onFocus}
                onChange={onInput}
                onBlur={(event) => onInput(event.target.value)}
                // onEnterPressed={(event) => onChange(event.target}
                validation={validation}
                value={textInput}
            />
        </>
    );
};
