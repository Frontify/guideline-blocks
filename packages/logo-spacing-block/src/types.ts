import { CSSProperties, ReactNode } from 'react';

import { Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

export enum LogoSpacingType {
    Percentage = 'percentage_clearspace',
    Pixels = 'pixel_clearspace',
}

export enum Size {
    S = 's',
    M = 'm',
    L = 'l',
}

export enum LineStyle {
    NoLine = 'NoLine',
    Dashed = 'Dashed',
    Solid = 'Solid',
    Dotted = 'Dotted',
}

export enum Property {
    Height = 'height',
    Width = 'width',
}

export type BorderSettings = {
    lineColor: Color;
    lineStyle: LineStyle;
    lineWidth: string;
};

export type LogoSpacingSettings = BorderSettings & {
    clearSpaceBgColor: Color;
    clearSpaceBottom: string;
    clearSpaceChoice: Size | 'none';
    clearSpaceLeft: string;
    clearSpacePropertyChoice: Property;
    clearSpaceRight: string;
    clearSpaceTop: string;
    color: 'violet' | 'blue' | 'green' | 'red';
    containerSizeChoice: Size;
    hasCustomClearSpace: boolean;
    hasCustomOffset: boolean;
    labelColor: Color;
    logoSpacingType: LogoSpacingType;
    offsetBottom: string;
    offsetLeft: string;
    offsetRight: string;
    offsetTop: string;
};

export type LogoGridProps = {
    asset: Asset;
    bgColor: Color;
    borderSettings: BorderSettings;
    containerHeight: number;
    containerWidth: number;
    content: {
        bottom: string;
        left: string;
        right: string;
        top: string;
    };
    gridTemplateColumns: string;
    gridTemplateRows: string;
    labelColor: Color;
};

export enum GridElementPosition {
    Top = 'Top',
    Right = 'Right',
    Bottom = 'Bottom',
    Left = 'Left',
    TopLeft = 'TopLeft',
    TopRight = 'TopRight',
    BottomLeft = 'BottomLeft',
    BottomRight = 'BottomRight',
}

export type GridElementProps = {
    bgColor: Color;
    borderStyle: CSSProperties;
    borderWidth: string;
    children?: ReactNode;
    col: string;
    labelColor?: Color;
    position: GridElementPosition;
    row: string;
};
