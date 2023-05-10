/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { Radius } from '@frontify/guideline-blocks-shared';

export type Settings = {
    backgroundColor: Color;
    chars: string;
    fontColor: Color;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
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
