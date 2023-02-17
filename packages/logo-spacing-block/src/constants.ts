import { LineStyle, LogoSpacingType, Size } from './types';

export const LOGO_SPACING_ID = 'logoSpacingUnit';
export const BOUNDARIES_THICKNESS_ID = 'lineWidth';
export const BOUNDARIES_COLOR_ID = 'lineColor';
export const CLEARSPACE_BG_COLOR_ID = 'clearSpaceBgColor';
export const LOGO_ID = 'logo';

export const CLEAR_SPACE_LABELS = {
    [LogoSpacingType.Pixels]: 'Pixel clearspace',
    [LogoSpacingType.Percentage]: 'Percentage clearspace',
};

export const CLEAR_SPACE_UNITS = [
    {
        value: LogoSpacingType.Pixels,
        label: CLEAR_SPACE_LABELS[LogoSpacingType.Pixels],
    },
    {
        value: LogoSpacingType.Percentage,
        label: CLEAR_SPACE_LABELS[LogoSpacingType.Percentage],
    },
];

export const topBottomOffsetMap: Record<Size, string> = {
    [Size.S]: '16px',
    [Size.M]: '24px',
    [Size.L]: '36px',
};

export const leftRightOffsetMap: Record<Size, string> = {
    [Size.S]: '32px',
    [Size.M]: '32px',
    [Size.L]: '36px',
};

export const CONTAINER_SIZE: Record<Size, number> = {
    [Size.S]: 40,
    [Size.M]: 60,
    [Size.L]: 80,
};

export const CLEAR_SPACE_PERCENT_SIZE: Record<Size, number> = {
    [Size.S]: 10,
    [Size.M]: 20,
    [Size.L]: 40,
};

export const STYLE_DEFAULT_VALUE = LineStyle.Dashed;
export const COLOR_DEFAULT_CLEARSPACE = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    name: 'White',
};
export const COLOR_DEFAULT_LABEL = {
    red: 8,
    green: 8,
    blue: 8,
    alpha: 1,
    name: 'Dark Grey',
};
export const LINE_STYLE = {
    [LineStyle.Dashed]: 'dashed',
    [LineStyle.Dotted]: 'dotted',
    [LineStyle.NoLine]: '',
    [LineStyle.Solid]: 'solid',
};
