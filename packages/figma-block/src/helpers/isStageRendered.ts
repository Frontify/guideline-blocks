/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isStageRendered = (entry?: ResizeObserverEntry): boolean =>
    entry !== undefined && entry.contentRect.width > 0 && entry.contentRect.height > 0;
