import { Key } from 'react';
import { ChecklistContent } from '../types';
import { ItemDropTarget } from '@react-types/shared';

export const updateItemById = (
    array: ChecklistContent[],
    idToUpdate: string,
    properties: Partial<ChecklistContent>
): ChecklistContent[] => {
    return array.reduce((acc: ChecklistContent[], item: ChecklistContent) => {
        if (item.id === idToUpdate) return [...acc, { ...item, ...properties }];
        return [...acc, item];
    }, []);
};

export const createItem = (text: string): ChecklistContent => {
    const creationDate = Date.now();
    const id = Math.ceil(Math.random() * creationDate).toString();
    return {
        id,
        text,
        updatedAt: creationDate,
        completed: false,
    };
};

export const findIndexById = (content: ChecklistContent[], id: Key): number =>
    content.findIndex((item) => item.id === id);

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
