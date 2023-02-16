/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test, vi } from 'vitest';
import { BrandItemSize, BrandPositioningBlockSettings } from '../types';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { splitBlockSettingsByArea } from './splitBlockSettingsByArea';

const SETTINGS: BrandPositioningBlockSettings = {
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
    boardAxisLinesStyle: BorderStyle.Solid,
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
    borderStyle_boardBorder: BorderStyle.Solid,
    borderStyle_brandItemBorder: BorderStyle.Solid,
    borderWidth_boardBorder: '1px',
    borderWidth_brandItemBorder: '1px',
    brandItemBackground: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    brandItemSizeCustom: '1px',
    brandItemSizeSimple: BrandItemSize.M,
    hasBorder_boardBorder: true,
    hasBorder_brandItemBorder: true,
    hasRadius_boardCornerRadius: true,
    hasRadius_brandItemCornerRadius: true,
    isBrandItemSizeCustom: true,
    radiusChoice_boardCornerRadius: Radius.Large,
    radiusChoice_brandItemCornerRadius: Radius.Medium,
    radiusValue_boardCornerRadius: '1px',
    radiusValue_brandItemCornerRadius: '1px',
    xAxisLeftLabel: 'Left',
    xAxisRightLabel: 'Right',
    yAxisBottomLabel: 'Bottom',
    yAxisTopLabel: 'Top',
};

vi.mock('@frontify/guideline-blocks-shared', () => ({
    BorderStyle: {
        Solid: 'Solid',
        Dashed: 'Dashed',
        Dotted: 'Dotted',
    },
    Radius: {
        None: 'None',
        Small: 'Small',
        Medium: 'Medium',
        Large: 'Large',
    },
    BrandItemSize: {
        S: 'Small',
        M: 'Medium',
        L: 'Large',
    },
}));

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
