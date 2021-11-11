/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BlockType, SliderBlock } from '../../hooks/useSettings';
import { SliderBlock as SliderBlockComponent, SliderBlockProps } from './SliderBlock';

const sliderSetting: SliderBlock = {
    id: 'slider',
    label: 'Slider',
    type: BlockType.Slider,
    defaultValue: 'auto',
    choices: [
        {
            value: 'auto',
            label: 'auto',
        },
        {
            value: '10px',
            label: 'S',
        },
        {
            value: '20px',
            label: 'M',
        },
        {
            value: '30px',
            label: 'L',
        },
    ],
};

export default {
    title: 'Sidebar Settings/Settings Block/Slider',
    component: SliderBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const SliderBlockTemplate: Story<SliderBlockProps> = (args: SliderBlockProps) => <SliderBlockComponent {...args} />;

export const normal = SliderBlockTemplate.bind({});
normal.args = {
    block: sliderSetting,
};
