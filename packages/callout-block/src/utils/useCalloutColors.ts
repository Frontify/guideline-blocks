/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokenName, TokenValues } from '@frontify/guideline-blocks-shared';

export const useCalloutColors = (
    designTokens: Partial<Record<DesignTokenName, TokenValues>> | null,
    textColor?: string
) => {
    if (!designTokens) {
        return;
    }

    if (!textColor) {
        return designTokens;
    }

    return {
        ...designTokens,
        heading1: { ...designTokens.heading1, color: textColor },
        heading2: { ...designTokens.heading2, color: textColor },
        heading3: { ...designTokens.heading3, color: textColor },
        heading4: { ...designTokens.heading4, color: textColor },
        p: { ...designTokens.p, color: textColor },
        link: { ...designTokens.link, color: textColor, textDecoration: 'underline' },
    };
};
