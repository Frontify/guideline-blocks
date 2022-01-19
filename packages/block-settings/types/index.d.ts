/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export { BaseBlock } from './blocks/base';
export { Bundle, SettingValue } from './bundle';

export enum Sections {
    Main = 'main',
    Content = 'content',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type BlockSettings = {
    [Sections.Main]?: SettingBlock[];
    [Sections.Content]?: SettingBlock[];
    [Sections.Layout]?: SettingBlock[];
    [Sections.Style]?: SettingBlock[];
    [Sections.Security]?: SettingBlock[];
};
