/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBlock } from './blocks';

export { BaseBlock } from './blocks/base';
export { ApiBundle, ApiField } from './bundle';

export enum Sections {
    Main = 'main',
    Content = 'content',
    Layout = 'layout',
    Style = 'style',
    Security = 'security',
    Targets = 'targets',
}

export type ApiSettings = {
    [Sections.Main]?: ApiBlock[];
    [Sections.Content]?: ApiBlock[];
    [Sections.Layout]?: ApiBlock[];
    [Sections.Style]?: ApiBlock[];
    [Sections.Security]?: ApiBlock[];
};
