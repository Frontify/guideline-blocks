/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LegacyOrderableListItem } from '@frontify/fondue';
import { ChecklistContent } from '../types';

export const createItem = (text: string, index: number | null): LegacyOrderableListItem<ChecklistContent> => {
    const creationDate = Date.now();
    const id = Math.ceil(Math.random() * creationDate).toString();

    return {
        id,
        text,
        alt: text,
        sort: index,
        updatedAt: creationDate,
        completed: false,
    };
};
