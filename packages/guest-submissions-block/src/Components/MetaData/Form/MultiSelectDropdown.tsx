/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiSelect } from '@frontify/fondue';
import React, { useState } from 'react';
import { MetadataProps } from '../type';
import { FormUtilities } from './type';
import { FormLabel } from './FormLabel';

export const MultiSelectDropdown = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
    type: { options },
}: MetadataProps & FormUtilities) => {
    const initialValue =
        typeof defaultValue === 'object' && defaultValue !== null && 'id' in defaultValue && 'value' in defaultValue
            ? [defaultValue.value]
            : [];
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(initialValue);

    const onInput = (value: (string | number)[]) => {
        setActiveItemKeys(value);
        const entries = options
            ?.filter((option) => value.includes(option.value))
            .map((item) => ({ propertyId: id, value: item.id }));

        onChange({ id, value: entries ?? [] });
    };

    return (
        <div>
            <FormLabel id={id} isRequired={isRequired}>
                {name}
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
