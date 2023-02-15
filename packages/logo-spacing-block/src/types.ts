import { Asset } from '@frontify/app-bridge';
import { ReactNode } from 'react';

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

export type LogoSpacingSettings = {
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
    offsetBottom: string;
    offsetLeft: string;
    offsetRight: string;
    offsetTop: string;
};

export type LogoGridProps = {
    asset: Asset;
    containerWidth: number;
    settings: LogoSpacingSettings;
    containerHeight: number;
};

export enum GridElementPosition {
    Top = 'Top',
    Right = 'Right',
    Bottom = 'Bottom',
    Left = 'Left',
}

export type GridElementProps = {
    position: GridElementPosition;
    children?: ReactNode;
    col: string;
    row: string;
};
