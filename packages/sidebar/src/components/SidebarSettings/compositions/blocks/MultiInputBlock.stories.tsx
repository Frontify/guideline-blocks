/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MultiInputLayout, IconEnum } from '@frontify/arcade';
import { BlockType, MultiInputBlock } from '../../hooks/useSettings';
import { SidebarSettings as SidebarSettingsComponent } from '../../SidebarSettings';
import { MultiInputBlock as MultiInputBlockComponent, MultiInputBlockProps } from './MultiInputBlock';

const multiInputSetting: MultiInputBlock = {
    id: 'multi-input',
    type: BlockType.MultiInput,
    label: 'Multi Input',
    layout: MultiInputLayout.Spider,
    blocks: [
        {
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
        },
        // TODO: Fix with dependency injector
        // {
        //     id: 'left-input',
        //     type: BlockType.ColorInput,
        // },
        {
            id: 'right-input',
            type: BlockType.Input,
            defaultValue: 'Right Input',
        },
        {
            id: 'bottom-input',
            type: BlockType.Input,
            defaultValue: 'Bottom Input',
        },
    ],
    lastItemFullWidth: true,
};

const multiInputWithInputSetting: MultiInputBlock = {
    id: 'multi-input-with-inputs',
    type: BlockType.MultiInput,
    label: 'Multi Input with inputs',
    layout: MultiInputLayout.Spider,
    blocks: [
        {
            id: 'top-input',
            type: BlockType.Input,
            defaultValue: 'Top',
        },
        {
            id: 'left-input',
            type: BlockType.Input,
            defaultValue: 'Left',
        },
        {
            id: 'right-input',
            type: BlockType.Input,
            defaultValue: 'Right',
        },
        {
            id: 'bottom-input',
            type: BlockType.Input,
            defaultValue: 'Bottom',
        },
    ],
    lastItemFullWidth: true,
};

export default {
    title: 'Sidebar Settings/Settings Block/Multi Input',
    component: SidebarSettingsComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const MultiInputBlockTemplate: Story<MultiInputBlockProps> = (args: MultiInputBlockProps) => (
    <MultiInputBlockComponent {...args} />
);

export const normal = MultiInputBlockTemplate.bind({});
normal.args = {
    block: multiInputSetting,
};

export const withInputs = MultiInputBlockTemplate.bind({});
withInputs.args = {
    block: multiInputWithInputSetting,
};
