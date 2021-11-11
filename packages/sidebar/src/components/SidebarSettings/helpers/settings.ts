/* (c) Copyright Frontify Ltd., all rights reserved. */

import { set } from 'lodash-es';
import { Block, BlockType, Data, PathMap, SectionIds, Structure } from '../hooks/useSettings';

const createPathsFromBlocks = (sectionId: SectionIds, blocks: Block[]) => {
    return blocks.reduce<{ [key: string]: string }>((paths, block, i) => {
        paths[block.id] = `${sectionId}[${i}]`;
        if (block.type === BlockType.Switch) {
            block.on?.forEach(({ id }, j) => (paths[id] = `${sectionId}[${i}].on[${j}]`));
            block.off?.forEach(({ id }, j) => (paths[id] = `${sectionId}[${i}].off[${j}]`));
        } else if (block.type === BlockType.MultiInput) {
            block.blocks.forEach(({ id }, j) => (paths[id] = `${sectionId}[${i}].blocks[${j}]`));
        }

        return paths;
    }, {});
};

export const createPaths = (structure: Structure): PathMap => {
    return Object.entries(structure).reduce<PathMap>((paths, [sectionId, blocks]) => {
        return {
            ...paths,
            ...createPathsFromBlocks(sectionId as SectionIds, blocks),
        };
    }, {});
};

/**
 * Apply data to structure and return settings as a new copy
 */
export const applyDataToStructure = (data: Data, settings: Structure, pathMap: PathMap): Structure => {
    return Object.entries(data).reduce(
        (appliedSettings, [id, value]) => {
            const path = pathMap[id];
            if (!path) {
                return appliedSettings;
            }

            set(appliedSettings, `${path}.value`, value);

            return appliedSettings;
        },
        { ...settings }
    );
};
