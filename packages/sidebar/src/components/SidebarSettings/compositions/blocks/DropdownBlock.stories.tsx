/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropdownSize, IconEnum } from '@frontify/arcade';
import { BlockType, DropdownBlock } from '../../hooks/useSettings';
import { DropdownBlock as DropdownBlockComponent, DropdownBlockProps } from './DropdownBlock';

const dropdownSetting: DropdownBlock = {
    id: 'dropdown',
    type: BlockType.Dropdown,
    defaultValue: 'storybook-demo',
    choices: [
        {
            value: 'storybook-demo',
            label: 'Storybook Demo',
            icon: IconEnum.Info,
        },
        {
            value: 'frontify',
            label: 'Frontify',
            icon: IconEnum.Info,
        },
    ],
};

export default {
    title: 'Sidebar Settings/Settings Block/Dropdown',
    component: DropdownBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const DropdownBlockComponentTemplate: Story<DropdownBlockProps> = (args: DropdownBlockProps) => (
    <DropdownBlockComponent {...args} />
);

export const small = DropdownBlockComponentTemplate.bind({});
small.args = {
    block: { ...dropdownSetting, size: DropdownSize.Small },
};

export const large = DropdownBlockComponentTemplate.bind({});
large.args = {
    block: { ...dropdownSetting, size: DropdownSize.Large },
};

export const disabled = DropdownBlockComponentTemplate.bind({});
disabled.args = {
    block: { ...dropdownSetting, size: DropdownSize.Large, disabled: true },
};
