/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ItemDropTarget } from '@react-types/shared';
import { ChecklistContent } from '../types';
import { findIndexById } from './findIndexById';

export const findIndexesForMove = (
    content: ChecklistContent[],
    selectedGridItemKeys: React.Key[],
    gridItemLocation: ItemDropTarget
) => {
    let newIndex = findIndexById(content, gridItemLocation.key);
    const oldIndex = findIndexById(content, selectedGridItemKeys[0]);
    if (oldIndex < newIndex) {
        newIndex--;
    }
    if (gridItemLocation.dropPosition === 'after') {
        newIndex++;
    }

    return [oldIndex, newIndex];
};
