/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LegacyOrderableListItem } from '@frontify/fondue';
import { ChecklistContent } from '../types';

export const filterCompleteItems = (
    content: LegacyOrderableListItem<ChecklistContent>[]
): LegacyOrderableListItem<ChecklistContent>[] =>
    content.filter(({ completed }: LegacyOrderableListItem<ChecklistContent>) => !completed);
