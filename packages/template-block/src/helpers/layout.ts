/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, TextPositioningType, paddingStyleMap, textPositioningToFlexDirection } from '../types';

export const getCardPadding = (blockSettings: Settings) => {
    const {
        hasBorder_blockCard,
        hasBackground,
        hasCustomPaddingValue_blockCard,
        paddingValue_blockCard,
        paddingChoice_blockCard,
    } = blockSettings;

    if (hasBorder_blockCard || hasBackground) {
        return hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard];
    }

    return undefined;
};

export const getIsRows = (hasPreview: boolean, textPositioning: TextPositioningType): boolean => {
    const flexDirection = hasPreview ? textPositioningToFlexDirection[textPositioning] : 'row';
    return hasPreview && ['row', 'row-reverse'].includes(flexDirection);
};

export const getLayoutClasses = (hasPreview: boolean, textPositioning: TextPositioningType) => {
    const previewClasses = getIsRows(hasPreview, textPositioning)
        ? 'tw-flex-col'
        : 'tw-grid tw-grid-rows-2 grid-flow-col';

    return hasPreview ? previewClasses : 'tw-grid tw-grid-cols-3';
};
