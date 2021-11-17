import { Color } from '@frontify/arcade';
import { BaseBlock } from './base';

export type ColorInputBlock = {
    type: 'colorInput';
    value?: Color;
    defaultValue?: Color;
} & BaseBlock;
