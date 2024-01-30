/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LegacyOrderableListItem } from '@frontify/fondue';
import { ChecklistContent } from '../types';

export const updateItemById = (
    array: LegacyOrderableListItem<ChecklistContent>[],
    idToUpdate: string,
    properties: Partial<ChecklistContent>
): LegacyOrderableListItem<ChecklistContent>[] =>
    array.reduce(
        (acc: LegacyOrderableListItem<ChecklistContent>[], item: LegacyOrderableListItem<ChecklistContent>) =>
            item.id === idToUpdate ? [...acc, { ...item, ...properties }] : [...acc, item],
        []
    );
