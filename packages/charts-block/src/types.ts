/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export type ChartsBlockProps = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    type: ChartType;
};

export enum ChartType {
    Line = 'Line',
    Bar = 'Bar',
    Pie = 'Pie',
}
