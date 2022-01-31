/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/arcade';
import { BaseBlock } from './base';

export type ColorInputBlock = {
    type: 'colorInput';
} & BaseBlock<Color>;
