/* (c) Copyright Frontify Ltd., all rights reserved. */
import { ChecklistContent } from '../types';

export const totalCompletedCount = (array: ChecklistContent[]): number =>
    array.reduce((acc, item) => (item.completed ? acc + 1 : acc), 0);

export const calculatePercentage = (content: ChecklistContent[]): number => {
    return +((totalCompletedCount(content) / content.length) * 100).toFixed(0);
};

export const calculateFraction = (content: ChecklistContent[]): string => {
    return `${totalCompletedCount(content)}/${content.length}`;
};
