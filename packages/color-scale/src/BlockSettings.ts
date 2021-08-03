import { Color } from './Color';
import { ColorScaleSize } from './ColorScaleSize';
import { ColorScaleStyle } from './ColorScaleStyle';

export interface BlockSettings {
    style: ColorScaleStyle;
    size: ColorScaleSize;
    _colorIds?: number[];
    colors?: Color[];
}
