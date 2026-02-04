/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { type Color } from '@frontify/fondue';
import { type Radius } from '@frontify/guideline-blocks-settings';

export type BlockProps = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    hasBackground: boolean;
    backgroundColor: Color | null;
    chars: string;
    fontColor: Color | null;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
    hasBorder: boolean;
    borderStyle: string;
    borderWidth: string;
    borderColor: Color | null;
    radiusChoice: Radius;
    hasRadius: boolean;
    radiusValue: string;
};

export type ApiFontStyle = {
    name: string;
    css_family_name: string;
    font_style: string;
    font_weight: string;
};
