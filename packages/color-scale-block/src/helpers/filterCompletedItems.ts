/* (c) Copyright Frontify Ltd., all rights reserved. */

export const filterCompleteItems = (content: any): any => content.filter(({ completed }: any) => !completed);
