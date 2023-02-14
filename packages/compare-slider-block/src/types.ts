import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius } from '../../shared';

export type BlockSettings = {
    alignment: Alignment;
    borderColor: Color;
    borderRadius: Radius;
    borderStyle: BorderStyle;
    borderWidth: string;
    customBorderRadius: string;
    customHeight: number;
    handle: Handle;
    hasCustomBorderRadius: boolean;
    hasCustomHeight: boolean;
    height: Height;
    sliderColor: Color;
    sliderWidth: string;
};

export enum SliderImageSlot {
    First = 'first',
    Second = 'second',
}

export enum Alignment {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export enum Height {
    Auto = 'auto',
    Small = 's',
    Medium = 'm',
    Large = 'l',
}

export const heightStyleMap: Record<Height, number> = {
    [Height.Auto]: 0,
    [Height.Small]: 200,
    [Height.Medium]: 350,
    [Height.Large]: 500,
};

export enum Handle {
    Arrows = 'arrows',
    Circles = 'circles',
    None = 'none',
}
