/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';

export type Settings = {
    backgroundColor: Color;
    chars: string;
    color: Color;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
    borderStyle: string;
    borderWidth: string;
    borderColor: Color;
};

export enum CornerRadius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const radiusValues: Record<CornerRadius, string> = {
    [CornerRadius.None]: '0px',
    [CornerRadius.Small]: '2px',
    [CornerRadius.Medium]: '4px',
    [CornerRadius.Large]: '12px',
};
