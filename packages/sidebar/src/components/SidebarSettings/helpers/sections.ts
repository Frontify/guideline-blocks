/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Block, SectionIds, Structure } from '../hooks/useSettings';
import { Condition } from '../hooks/useCondition';

type SidebarSection = {
    title: string;
    blocks: Block[];
};

const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.substr(1)}`;

const hasBlocks = (blocks?: Block[]): blocks is Block[] => blocks !== undefined && blocks.length > 0;

export const hasAtLeastOneSection = (sections: SidebarSection[]): sections is SidebarSection[] => {
    return sections.some((section) => hasBlocks(section.blocks));
};

export const getSubSections = (settings: Structure, condition: Condition): SidebarSection[] => {
    return Object.entries(settings).reduce<SidebarSection[]>((sections, [sectionId, blocks]) => {
        if (sectionId === SectionIds.Main) {
            return sections;
        }

        const visibleBlocks = blocks.filter(({ show }) => (show === undefined ? true : condition(show)));
        if (hasBlocks(visibleBlocks)) {
            sections.push({
                title: capitalize(sectionId),
                blocks: visibleBlocks,
            });
        }

        return sections;
    }, []);
};
