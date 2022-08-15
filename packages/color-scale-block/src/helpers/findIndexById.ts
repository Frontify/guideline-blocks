/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Key } from 'react';
import { ChecklistContent } from '../types';

export const findIndexById = (content: ChecklistContent[], id: Key): number =>
    content.findIndex((item) => parseInt(item.id) === id);
