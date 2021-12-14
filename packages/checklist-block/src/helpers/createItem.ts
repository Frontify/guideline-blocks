/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChecklistContent } from '../types';

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
