/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { BrandPositioningBlockSettings } from '../types';
import { splitBlockSettingsByArea } from './splitBlockSettingsByArea';

const SETTINGS = {
    items: [
        {
            id: '1',
            position: { x: 5, y: 10 },
            assetId: 98,
        },
    ],
    axisColor: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    boardAxisLabelsColor: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    boardAxisLinesStyle: 'Solid',
    boardAxisLinesWidth: '1px',
    boardBackgroundColor: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    borderColor_boardBorder: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    borderColor_brandItemBorder: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    borderStyle_boardBorder: 'Solid',
    borderStyle_brandItemBorder: 'Solid',
    borderWidth_boardBorder: '1px',
    borderWidth_brandItemBorder: '1px',
    brandItemBackground: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    brandItemSizeCustom: '1px',
    brandItemSizeSimple: 'medium',
    hasBorder_boardBorder: true,
    hasBorder_brandItemBorder: true,
    hasRadius_boardCornerRadius: true,
    hasRadius_brandItemCornerRadius: true,
    isBrandItemSizeCustom: true,
    radiusChoice_boardCornerRadius: 'Large',
    radiusChoice_brandItemCornerRadius: 'Medium',
    radiusValue_boardCornerRadius: '1px',
    radiusValue_brandItemCornerRadius: '1px',
    xAxisLeftLabel: 'Left',
    xAxisRightLabel: 'Right',
    yAxisBottomLabel: 'Bottom',
    yAxisTopLabel: 'Top',
} as BrandPositioningBlockSettings;

describe('splitBlockSettingsByArea', () => {
    test('correctly splits axis, board and item settings', () => {
        const { axisStyle, boardStyle, itemStyle } = splitBlockSettingsByArea(SETTINGS);
        expect(axisStyle).toEqual({
            lineColor: SETTINGS.axisColor,
            lineWidth: SETTINGS.boardAxisLinesWidth,
            lineStyle: SETTINGS.boardAxisLinesStyle,
            labelsColor: SETTINGS.boardAxisLabelsColor,
        });

        expect(boardStyle).toEqual({
            backgroundColor: SETTINGS.boardBackgroundColor,
            borderColor: SETTINGS.borderColor_boardBorder,
            borderStyle: SETTINGS.borderStyle_boardBorder,
            borderWidth: SETTINGS.borderWidth_boardBorder,
            hasBorder: SETTINGS.hasBorder_boardBorder,
            borderRadius: SETTINGS.radiusChoice_boardCornerRadius,
            customBorderRadius: SETTINGS.radiusValue_boardCornerRadius,
            hasCustomRadius: SETTINGS.hasRadius_boardCornerRadius,
        });

        expect(itemStyle).toEqual({
            backgroundColor: SETTINGS.brandItemBackground,
            borderColor: SETTINGS.borderColor_brandItemBorder,
            borderStyle: SETTINGS.borderStyle_brandItemBorder,
            borderWidth: SETTINGS.borderWidth_brandItemBorder,
            hasBorder: SETTINGS.hasBorder_brandItemBorder,
            borderRadius: SETTINGS.radiusChoice_brandItemCornerRadius,
            customBorderRadius: SETTINGS.radiusValue_brandItemCornerRadius,
            hasCustomRadius: SETTINGS.hasRadius_brandItemCornerRadius,
            itemSizeSimple: SETTINGS.brandItemSizeSimple,
            itemSizeCustom: SETTINGS.brandItemSizeCustom,
            isBrandItemSizeCustom: SETTINGS.isBrandItemSizeCustom,
        });
    });
});
