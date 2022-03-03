/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DynamicSettingBlock } from './blocks';

export * from './blocks';
export type { BaseBlock } from './blocks/base';
export type { Bundle, SettingValue } from './bundle';
export type { Rule } from './validation';

export enum Sections {
    Main = 'main',
    Content = 'content',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type BlockSettings = {
    [Sections.Main]?: DynamicSettingBlock[];
    [Sections.Content]?: DynamicSettingBlock[];
    [Sections.Layout]?: DynamicSettingBlock[];
    [Sections.Style]?: DynamicSettingBlock[];
    [Sections.Security]?: DynamicSettingBlock[];
};
