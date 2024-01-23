/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings, paddingStyleMap } from '../types';

export const getCardPadding = (blockSettings: Settings) => {
    const { hasCustomPaddingValue_blockCard, paddingValue_blockCard, paddingChoice_blockCard } = blockSettings;
    return hasCustomPaddingValue_blockCard ? paddingValue_blockCard : paddingStyleMap[paddingChoice_blockCard];
};
