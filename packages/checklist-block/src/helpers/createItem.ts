/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableListItem } from '@frontify/arcade';
import { ChecklistContent } from '../types';

export const createItem = (text: string): OrderableListItem<ChecklistContent> => {
    const creationDate = Date.now();
    const id = Math.ceil(Math.random() * creationDate).toString();

    return {
        id,
        text,
        alt: text,
        sort: null,
        updatedAt: creationDate,
        completed: false,
    };
};
