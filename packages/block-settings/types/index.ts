/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock } from './blocks';

export * from './blocks';
export type { BaseBlock } from './blocks/base';
export type { Bundle, SettingValue } from './bundle';
export type { Rule } from './validation';

export enum Sections {
    Main = 'main',
    Basics = 'basics',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type BlockSettings = {
    [Sections.Main]?: SettingBlock[];
    [Sections.Basics]?: SettingBlock[];
    [Sections.Layout]?: SettingBlock[];
    [Sections.Style]?: SettingBlock[];
    [Sections.Security]?: SettingBlock[];
};
