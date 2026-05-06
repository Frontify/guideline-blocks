/* (c) Copyright Frontify Ltd., all rights reserved. */

export type CssColor = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};

type ParsedColor = Omit<Color, 'name'>;

export type RgbaColorGraphQL = Omit<Color, 'name'> & {
    __typename?: 'RgbaColor';
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>> | T;

export const areColorsEqual = (color1?: CssColor, color2?: CssColor): boolean => {
    if (!color1 || !color2) {
        return false;
    }
    return (
        color1.red === color2.red &&
        color1.green === color2.green &&
        color1.blue === color2.blue &&
        color1.alpha === color2.alpha
    );
};

const CssColorDefaultRed = 0;
const CssColorDefaultGreen = 0;
const CssColorDefaultBlue = 0;
const CssColorDefaultAlpha = 1;

export const isColorLight = (color: CssColor): boolean => {
    // copied brightness calculation from tiny color
    const brightness = (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;

    return brightness > 128 || (color.alpha && color.alpha < 0.25) || false;
};

const fromKnownColorToCssColor = (color: Color | RgbaColorGraphQL | ParsedColor): CssColor => {
    return {
        red: color.red <= 255 && color.red >= 0 ? color.red : CssColorDefaultRed,
        green: color.green <= 255 && color.green >= 0 ? color.green : CssColorDefaultBlue,
        blue: color.blue <= 255 && color.blue >= 0 ? color.blue : CssColorDefaultGreen,
        alpha:
            typeof color.alpha === 'number' && color.alpha <= 1 && color.alpha >= 0
                ? color.alpha
                : CssColorDefaultAlpha,
    };
};

export const fromGraphQLColorToCssColor = (color: RgbaColorGraphQL): CssColor => {
    return fromKnownColorToCssColor(color);
};

export const toRgbFunction = (cssColor: CssColor): string => {
    return cssColor.alpha === undefined || cssColor.alpha >= 1 || cssColor.alpha < 0
        ? `rgb(${cssColor.red} ${cssColor.green} ${cssColor.blue})`
        : `rgb(${cssColor.red} ${cssColor.green} ${cssColor.blue} / ${cssColor.alpha})`;
};
