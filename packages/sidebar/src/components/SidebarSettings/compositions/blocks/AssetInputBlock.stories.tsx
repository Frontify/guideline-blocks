/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FileExtensionSets } from '@frontify/app-bridge';
import { AssetInputBlock, BlockType } from '../../hooks/useSettings';
import { SidebarSettings as SidebarSettingsComponent } from '../../SidebarSettings';
import { AssetInputBlock as AssetInputBlockComponent, AssetInputBlockProps } from './AssetInputBlock';

const assetInputSetting: AssetInputBlock = {
    id: 'asset-input',
    type: BlockType.AssetInput,
    label: 'Asset Input',
    allowedExtensions: FileExtensionSets.images,
};

export default {
    title: 'Sidebar Settings/Settings Block/AssetInput',
    component: SidebarSettingsComponent,
    args: { block: assetInputSetting },
} as Meta;

export const normal: Story<AssetInputBlockProps> = (args: AssetInputBlockProps) => (
    <AssetInputBlockComponent {...args} />
);
