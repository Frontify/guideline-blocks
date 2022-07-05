/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

export type ChartsBlockProps = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    type: ChartType;
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: ChartHeight;
    color?: Color;
    labelColor?: Color;
};

export type ChartProps = {
    data: any;
    height: string;
    color: string;
    labelColor: string;
    line?: string;
    lines?: string[];
};

export enum ChartHeight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum ChartType {
    Line = 'Line',
    Bar = 'Bar',
    Pie = 'Pie',
}

export const chartHeightValues: Record<ChartHeight, string> = {
    [ChartHeight.Small]: '400px',
    [ChartHeight.Medium]: '600px',
    [ChartHeight.Large]: '800px',
};
