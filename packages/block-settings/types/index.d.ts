/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export { BaseBlock } from './blocks/base';
export { Bundle, Field } from './bundle';

export enum SettingSection {
    Main = 'main',
    Content = 'content',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type Settings = {
    [SettingSection.Main]?: SettingBlock[];
    [SettingSection.Content]?: SettingBlock[];
    [SettingSection.Layout]?: SettingBlock[];
    [SettingSection.Style]?: SettingBlock[];
    [SettingSection.Security]?: SettingBlock[];
};
