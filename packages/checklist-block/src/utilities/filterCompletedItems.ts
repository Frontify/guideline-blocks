import { ChecklistContent } from '../types';

export const filterCompleteItems = (content: ChecklistContent[]): ChecklistContent[] =>
    content.filter(({ completed }: ChecklistContent) => {
        return !completed;
    });
