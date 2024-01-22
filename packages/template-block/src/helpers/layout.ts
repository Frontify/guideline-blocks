/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, paddingStyleMap } from '../types';

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
