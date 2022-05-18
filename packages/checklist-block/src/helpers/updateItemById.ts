/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableListItem } from '@frontify/arcade';
import { ChecklistContent } from '../types';

export const updateItemById = (
    array: OrderableListItem<ChecklistContent>[],
    idToUpdate: string,
    properties: Partial<ChecklistContent>
): OrderableListItem<ChecklistContent>[] =>
    array.reduce(
        (acc: OrderableListItem<ChecklistContent>[], item: OrderableListItem<ChecklistContent>) =>
            item.id === idToUpdate ? [...acc, { ...item, ...properties }] : [...acc, item],
        []
    );
