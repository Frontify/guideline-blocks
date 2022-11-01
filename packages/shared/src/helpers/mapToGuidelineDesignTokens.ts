/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DesignTokenName,
    DesignTokenProperties,
    DesignTokenPropertiesEnum,
    DesignTokens,
    DirectionalCssProperties,
    TokenValues,
    TransformedDesignTokens,
} from '../hooks/useGuidelineDesignTokens';
import { provideDefaultCalloutColors } from './provideDefaultCalloutColors';

const transformDesignTokens = (dataToTransform: DesignTokenProperties) => {
    const cssStyles: TokenValues = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        if (typeof value === 'object') {
            transformObjectValues(key, cssStyles, value);
        } else {
            transformStringValues(key, cssStyles, value);
        }
    }
    return cssStyles;
};

const transformObjectValues = (key: string, cssStyles: TokenValues, value: DirectionalCssProperties) => {
    if (key === DesignTokenPropertiesEnum.frame) {
        cssStyles.paddingTop = value.top;
        cssStyles.paddingRight = value.right;
        cssStyles.paddingBottom = value.bottom;
        cssStyles.paddingLeft = value.left;
    }
};

const transformStringValues = (key: string, cssStyles: TokenValues, value: string) => {
    console.log('transformStringValues', key, cssStyles, value);
    cssStyles.hover = cssStyles.hover || {};
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
        case DesignTokenPropertiesEnum.background_color:
            cssStyles.backgroundColor = value;
            break;
        case DesignTokenPropertiesEnum.border_color:
            cssStyles.borderColor = value;
            break;
        case DesignTokenPropertiesEnum.border_radius:
            cssStyles.borderRadius = value;
            break;
        case DesignTokenPropertiesEnum.border_width:
            cssStyles.borderWidth = value;
            break;
        case DesignTokenPropertiesEnum.color_hover:
            cssStyles.hover.color = value;
            break;
        case DesignTokenPropertiesEnum.background_color_hover:
            cssStyles.hover.backgroundColor = value;
            break;
        case DesignTokenPropertiesEnum.border_color_hover:
            cssStyles.hover.borderColor = value;
            break;
    }
    if (Object.keys(cssStyles.hover).length === 0) {
        delete cssStyles.hover;
    }
};

export const mapToGuidelineDesignTokens = (dataToTransform: DesignTokens) => {
    const transformedDesignTokens: TransformedDesignTokens = {};
    const enrichedDataToTransform = provideDefaultCalloutColors(dataToTransform);

    for (const [key, value] of Object.entries(enrichedDataToTransform)) {
        transformedDesignTokens[key as DesignTokenName] = transformDesignTokens(value) as TokenValues;
    }
    return transformedDesignTokens;
};
