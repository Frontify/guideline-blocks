import { MultiSelect } from "@frontify/fondue";
import React, { useState } from "react";
import { MetadataProps } from "../type";
import { FormUtilities } from "./type";
import { FormLabel } from "./FormLabel";

export const MultiSelectDropdown = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
    valueType: { propertyType, options },
}: MetadataProps & FormUtilities) => {
    const initialValue =
        defaultValue && defaultValue.value ? [defaultValue.value] : [];
    const [activeItemKeys, setActiveItemKeys] =
        useState<(string | number)[]>(initialValue);

    const onInput = (value: (string | number)[]) => {
        setActiveItemKeys(value);
        onChange({ id, value: value.join(",") });
    };

    return (
        <div>
            <FormLabel id={id}>
                {name} {isRequired && "*"}{" "}
            </FormLabel>

            <MultiSelect
                validation={validation}
                activeItemKeys={activeItemKeys}
                items={options ?? []}
                onSelectionChange={onInput}
                placeholder={name}
            />
        </div>
    );
};
