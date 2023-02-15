/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockSettingsByArea, BrandPositioningBlockSettings } from '../types';

export const splitBlockSettingsByArea = (settings: BrandPositioningBlockSettings): BlockSettingsByArea => {
    const axisStyle = {
        lineColor: settings.axisColor,
        labelsColor: settings.boardAxisLabelsColor,
        lineStyle: settings.boardAxisLinesStyle,
        lineWidth: settings.boardAxisLinesWidth,
    };

    const boardStyle = {
        backgroundColor: settings.boardBackgroundColor,
        borderColor: settings.borderColor_boardBorder,
        borderStyle: settings.borderStyle_boardBorder,
        borderWidth: settings.borderWidth_boardBorder,
        hasBorder: settings.hasBorder_boardBorder,
        borderRadius: settings.radiusChoice_boardCornerRadius,
        customBorderRadius: settings.radiusValue_boardCornerRadius,
        hasCustomRadius: settings.hasRadius_boardCornerRadius,
    };

    const itemStyle = {
        backgroundColor: settings.brandItemBackground,
        borderColor: settings.borderColor_brandItemBorder,
        borderStyle: settings.borderStyle_brandItemBorder,
        borderWidth: settings.borderWidth_brandItemBorder,
        hasBorder: settings.hasBorder_brandItemBorder,
        borderRadius: settings.radiusChoice_brandItemCornerRadius,
        customBorderRadius: settings.radiusValue_brandItemCornerRadius,
        hasCustomRadius: settings.hasRadius_brandItemCornerRadius,
        itemSizeSimple: settings.brandItemSizeSimple,
        itemSizeCustom: settings.brandItemSizeCustom,
        isBrandItemSizeCustom: settings.isBrandItemSizeCustom,
    };

    return { axisStyle, boardStyle, itemStyle };
};
