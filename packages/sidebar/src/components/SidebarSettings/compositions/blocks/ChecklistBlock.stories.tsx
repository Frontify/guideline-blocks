/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ChecklistBlock as ChecklistBlockComponent, ChecklistBlockProps } from './ChecklistBlock';
import { BlockType, ChecklistBlock } from '../../hooks/useSettings';

const checklistSettings: ChecklistBlock = {
    id: 'checklist',
    type: BlockType.Checklist,
    label: 'Checklist',
    choices: [
        { id: 'never', label: 'Never' },
        { id: 'gonna', label: 'Gonna' },
        { id: 'give', label: 'Give' },
        { id: 'you', label: 'You' },
        { id: 'up', label: 'Up' },
    ],
    defaultValue: [],
    showClearAndSelectAllButtons: true,
};

export default {
    title: 'Sidebar Settings/Settings Block/Checklist',
    component: ChecklistBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const ChecklistBlockTemplate: Story<ChecklistBlockProps> = (args: ChecklistBlockProps) => (
    <ChecklistBlockComponent {...args} />
);

export const normal = ChecklistBlockTemplate.bind({});
normal.args = {
    block: checklistSettings,
};
