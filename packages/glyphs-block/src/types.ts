/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { Radius } from '@frontify/guideline-blocks-shared';

export type BlockProps = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    hasBackground: boolean;
    backgroundColor: Color;
    chars: string;
    fontColor: Color;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
    hasBorder: boolean;
    borderStyle: string;
    borderWidth: string;
    borderColor: Color;
    radiusChoice: Radius;
    hasRadius: boolean;
    radiusValue: number;
};

export type ApiFontStyle = {
    name: string;
    css_family_name: string;
    font_style: string;
    font_weight: string;
};
