import { ApiBlock, SectionIds } from './blocks';

export { BaseBlock } from './blocks/base';

export type ApiSettings = {
    [SectionIds.Main]?: ApiBlock[];
    [SectionIds.Content]?: ApiBlock[];
    [SectionIds.Layout]?: ApiBlock[];
    [SectionIds.Style]?: ApiBlock[];
    [SectionIds.Security]?: ApiBlock[];
};
