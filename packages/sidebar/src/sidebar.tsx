import { DropdownSize } from '@frontify/arcade';
import React from 'react';
import ReactDOM from 'react-dom';
import { BlockType, DropdownBlock, SectionIds, SidebarSettings } from './components/SidebarSettings';

const dropdownSetting: DropdownBlock = {
    id: 'dropdown',
    type: BlockType.Dropdown,
    defaultValue: 'text',
    disabled: true,
    choices: [
        {
            value: 'storybook-demo',
            label: 'Storybook Demo',
        },
    ],
    size: DropdownSize.Large,
};

ReactDOM.render(
    <SidebarSettings
        breadcrumbs={[]}
        settingsStructure={{ [SectionIds.Main]: [dropdownSetting] }}
        settings={{}}
        targets={[]}
        targetsEnabled={false}
        onClosed={() => console.log('closed')}
        onValueChanged={() => console.log('value changed')}
    />,
    document.getElementById('root')
);
