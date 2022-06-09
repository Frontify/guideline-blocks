/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import {
    DesignTokenName,
    DesignTokenProperties,
    DesignTokenPropertiesEnum,
    DesignTokens,
    StyleCategoriesTransformed,
} from '../hooks/useGuidelineDesignTokens';

const transformStyles = (dataToTransform: DesignTokenProperties) => {
    const cssStyles: CSSProperties = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        switch (key) {
            case DesignTokenPropertiesEnum.family:
                cssStyles.fontFamily = value;
                break;
            case DesignTokenPropertiesEnum.weight:
                cssStyles.fontWeight = value;
                break;
            case DesignTokenPropertiesEnum.size:
                cssStyles.fontSize = value;
                break;
            case DesignTokenPropertiesEnum.letterspacing:
                cssStyles.letterSpacing = value;
                break;
            case DesignTokenPropertiesEnum.line_height:
                cssStyles.lineHeight = value;
                break;
            case DesignTokenPropertiesEnum.margin_top:
                cssStyles.marginTop = value;
                break;
            case DesignTokenPropertiesEnum.margin_bottom:
                cssStyles.marginBottom = value;
                break;
            case DesignTokenPropertiesEnum.uppercase:
                cssStyles.textTransform = value === '1' ? 'uppercase' : 'none';
                break;
            case DesignTokenPropertiesEnum.italic:
                cssStyles.fontStyle = value === '1' ? 'italic' : '';
                break;
            case DesignTokenPropertiesEnum.underline:
                cssStyles.textDecoration = value === '1' ? 'underline' : '';
                break;
            case DesignTokenPropertiesEnum.color:
                cssStyles.color = value;
                break;
        }
    }
    return cssStyles;
};

export const mapToGuidelineDesignTokens = (dataToTransform: DesignTokens) => {
    const categories: StyleCategoriesTransformed = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        categories[key as DesignTokenName] = transformStyles(value) as CSSProperties;
    }
    return categories;
};
