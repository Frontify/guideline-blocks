/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { ChecklistContent } from '../types';

export const filterCompleteItems = (content: any): any => content.filter(({ completed }: any) => !completed);
