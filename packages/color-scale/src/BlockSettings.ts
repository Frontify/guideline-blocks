import { Color } from './Color';
import { ColorScaleSize } from './ColorScaleSize';
import { ColorScaleStyle } from './ColorScaleStyle';

export type BlockSettings = {
    style: ColorScaleStyle;
    size: ColorScaleSize;
    colors?: Color[];
};
