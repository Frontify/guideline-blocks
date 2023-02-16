/* (c) Copyright Frontify Ltd., all rights reserved. */

export const calculateGridTemplateCols = (gridGap: number, columns: number) =>
    `repeat(auto-fit, minmax(${(800 - gridGap * (columns - 1)) / columns}px, 1fr))`;
