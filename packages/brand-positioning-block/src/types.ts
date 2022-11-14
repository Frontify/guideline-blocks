/* (c) Copyright Frontify Ltd., all rights reserved. */

export type BlockSettings = unknown;

export enum BrandItemSize {
    S = 's',
    M = 'm',
    L = 'l',
}

export const brandItemBrandItemSizeMap: Record<BrandItemSize, string> = {
    [BrandItemSize.S]: '40px',
    [BrandItemSize.M]: '48px',
    [BrandItemSize.L]: '56px',
};

export enum CornerRadius {
    NONE = 'none',
    S = 's',
    M = 'm',
    L = 'l',
}

export const cornerRadiusMap: Record<CornerRadius, string> = {
    [CornerRadius.NONE]: '0',
    [CornerRadius.S]: '2px',
    [CornerRadius.M]: '4px',
    [CornerRadius.L]: '12px',
};
