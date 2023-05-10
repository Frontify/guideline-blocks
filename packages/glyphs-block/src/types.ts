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
