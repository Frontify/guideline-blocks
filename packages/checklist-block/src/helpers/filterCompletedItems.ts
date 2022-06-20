/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableListItem } from '@frontify/fondue';
import { ChecklistContent } from '../types';

export const filterCompleteItems = (
    content: OrderableListItem<ChecklistContent>[]
): OrderableListItem<ChecklistContent>[] =>
    content.filter(({ completed }: OrderableListItem<ChecklistContent>) => !completed);
