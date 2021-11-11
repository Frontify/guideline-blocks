/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BlockType, SwitchBlock } from '../../hooks/useSettings';
import { SwitchBlock as SwitchBlockComponent, SwitchBlockProps } from './SwitchBlock';

const switchSetting: SwitchBlock = {
    id: 'switch',
    type: BlockType.Switch,
    defaultValue: false,
    label: 'Switch',
    switchLabel: 'Switch Label',
};

export default {
    title: 'Sidebar Settings/Settings Block/Switch',
    component: SwitchBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const SwitchBlockTemplate: Story<SwitchBlockProps> = (args: SwitchBlockProps) => <SwitchBlockComponent {...args} />;

export const normal = SwitchBlockTemplate.bind({});
normal.args = {
    block: switchSetting,
};
