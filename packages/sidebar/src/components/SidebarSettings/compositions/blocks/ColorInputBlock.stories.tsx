/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BlockType, ColorInputBlock } from '../../hooks/useSettings';
import { ColorInputBlock as ColorInputBlockComponent, ColorInputBlockProps } from './ColorInputBlock';

const colorInputSetting: ColorInputBlock = {
    id: 'color-input',
    type: BlockType.ColorInput,
    label: 'Color Input',
};

export default {
    title: 'Sidebar Settings/Settings Block/Color Input',
    component: ColorInputBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const ColorInputBlockComponentTemplate: Story<ColorInputBlockProps> = (args: ColorInputBlockProps) => (
    <ColorInputBlockComponent {...args} />
);

export const normal = ColorInputBlockComponentTemplate.bind({});
normal.args = {
    block: { ...colorInputSetting },
};
