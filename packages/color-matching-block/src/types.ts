/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import type { Color } from '@frontify/fondue';
import { CSSProperties } from 'react';

export type Props = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    imageId?: string;
    accentColor?: Color;
    prominentColor?: Color;
    complementaryColors?: Color[];
    headingTitle?: string;
    headingDescription?: string;
    sampleImagesIds?: string[];
    showComplementaryColor?: boolean;
    iconDescriptionFirst?: string;
    iconDescriptionSecond?: string;
    useCustomLogo?: boolean;
    useCustomIcons?: boolean;
    imageTitle?: string;
    imageDescription?: string;
};

export enum ColorMatchingType {
    Render = 'Render',
    Toolbar = 'Toolbar',
}

export type IconProps = {
    style?: CSSProperties;
};
