/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, DropdownSize, MenuItemContentSize } from '@frontify/fondue';
import React, { useState } from 'react';
import { MetadataProps } from '../type';
import { FormUtilities } from './type';
import { FormLabel } from './FormLabel';

export const SelectDropdown = ({
    id,
    isRequired,
    name,
    onChange,
    validation,
    type: { options },
}: MetadataProps & FormUtilities) => {
    // const initialValue =
    //     typeof defaultValue === 'object' && defaultValue !== null && 'id' in defaultValue && 'value' in defaultValue
    //         ? defaultValue.id
    //         : '';

    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();

    const onInput = (activeItemId: string | number | undefined) => {
        setActiveItemId(activeItemId);
        onChange({ id, value: activeItemId as string });
    };

    return (
        <div>
            <FormLabel id={id} isRequired={isRequired}>
                {name}
            </FormLabel>

            <Dropdown
                activeItemId={activeItemId}
                menuBlocks={[
                    {
                        id: 'block1',
                        ariaLabel: 'First section',
                        menuItems:
                            options?.map((item) => ({
                                id: item.id,
                                title: item.value,
                                size: MenuItemContentSize.Small,
                            })) ?? [],
                    },
                ]}
                onChange={onInput}
                size={DropdownSize.Small}
                validation={validation}
            />
        </div>
    );
};
