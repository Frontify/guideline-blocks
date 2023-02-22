/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Appearance, TransformedDesignTokens } from '../hooks/useGuidelineDesignTokens';
import { provideFallbackTokens } from './provideFallbackTokens';

export const mapToGuidelineDesignTokens = (dataToTransform: Appearance): TransformedDesignTokens => {
    console.log({ dataToTransform });
    const enrichedDataToTransform = provideFallbackTokens(dataToTransform);
    console.log({ enrichedDataToTransform });

    return enrichedDataToTransform;
};
