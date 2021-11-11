/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Dropdown, DropdownSize, FormControl, MenuItemContentSize, iconsMap } from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { DropdownBlock as DropdownBlockType } from '../../hooks/useSettings';

export type DropdownBlockProps = {
    block: DropdownBlockType;
    onUpdate: UpdateDataFunction<DropdownBlockType['value']>;
};

export const DropdownBlock: FC<DropdownBlockProps> = ({ block, onUpdate }) => {
    const onChange = (id?: string | number | string[]) => onUpdate(block.id, typeof id === 'string' ? id : undefined);

    return (
        <FormControl
            label={{
                children: block.label ?? '',
                htmlFor: block.id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
            disabled={block.disabled}
        >
            <div data-test-id="settings-sidebar-dropdown-block">
                <Dropdown
                    id={block.id}
                    key={block.id}
                    menuBlocks={[
                        {
                            id: block.id,
                            menuItems: block.choices.map(({ icon, label, value }) => ({
                                id: value,
                                decorator: icon ? iconsMap[icon] : undefined,
                                title: label ?? value,
                                subtitle: '',
                                size: MenuItemContentSize.Large,
                            })),
                        },
                    ]}
                    activeItemId={typeof block.value === 'string' ? block.value : block.defaultValue}
                    onChange={onChange}
                    placeholder={block.placeholder}
                    size={block.size ?? DropdownSize.Small}
                    disabled={block.disabled}
                />
            </div>
        </FormControl>
    );
};
