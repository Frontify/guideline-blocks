/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChecklistContent } from '../types';

export const updateItemById = (
    array: ChecklistContent[],
    idToUpdate: string,
    properties: Partial<ChecklistContent>
): ChecklistContent[] =>
    array.reduce(
        (acc: ChecklistContent[], item: ChecklistContent) =>
            item.id === idToUpdate ? [...acc, { ...item, ...properties }] : [...acc, item],
        []
    );
