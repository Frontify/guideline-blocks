/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, ColorRgb } from '@frontify/fondue';
import { BaseBlock } from './base';

type ColorFormats = Color | ColorRgb;

export type ColorInputBlock = {
    type: 'colorInput';
} & BaseBlock<ColorFormats>;
