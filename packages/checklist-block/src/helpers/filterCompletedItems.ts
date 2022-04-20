/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableListItem } from '@frontify/arcade';
import { ChecklistContent } from '../types';

export const filterCompleteItems = (
    content: OrderableListItem<ChecklistContent>[]
): OrderableListItem<ChecklistContent>[] =>
    content.filter(({ completed }: OrderableListItem<ChecklistContent>) => !completed);
