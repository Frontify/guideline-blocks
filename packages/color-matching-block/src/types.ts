/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import type { Color } from '@frontify/fondue';

export type Props = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    imageId?: string;
    toggleIconIds?: string[];
    toggleDescription?: string[];
    accentColor?: Color;
    prominentColor?: Color;
    complementaryColors?: Color[];
    blockTitle?: string;
    description?: string;
    headingTitle?: string;
    headingDescription?: string;
    sampleImagesIds?: string[];
    showComplementaryColor?: boolean;
};
