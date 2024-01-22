/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, TextPositioningType, paddingStyleMap, textPositioningToFlexDirection } from '../types';

export const getCardPadding = (blockSettings: Settings) => {
    const { hasCustomPaddingValue_blockCard, paddingValue_blockCard, paddingChoice_blockCard } = blockSettings;
    return hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard];
};

export const getIsRows = (hasPreview: boolean, textPositioning: TextPositioningType): boolean => {
    return hasPreview && ['row', 'row-reverse'].includes(textPositioningToFlexDirection[textPositioning]);
};

export const getLayoutClasses = (hasPreview: boolean, textPositioning: TextPositioningType) => {
    if (!hasPreview) {
        return 'tw-grid tw-grid-cols-3';
    }
    return getIsRows(hasPreview, textPositioning) ? 'tw-flex-col' : 'tw-grid grid-flow-col';
};
