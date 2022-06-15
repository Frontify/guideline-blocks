/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { BaseBlock } from './base';

export type ColorInputBlock = {
    type: 'colorInput';
} & BaseBlock<Color>;
