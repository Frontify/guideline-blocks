/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DesignTokenName,
    DesignTokenProperties,
    DesignTokenPropertiesEnum,
    DirectionalCssProperties,
    TokenValues,
    TransformedDesignTokens,
} from '../hooks/useGuidelineDesignTokens';
import { suffixPlainNumberWithPx } from '../utilities/suffixPlainNumberWithPx';
import { provideDefaultCalloutColors } from './provideDefaultCalloutColors';

const TokenNameMapper: Record<string, DesignTokenName> = {
    button_primary: 'buttonPrimary',
    button_secondary: 'buttonSecondary',
    button_tertiary: 'buttonTertiary',
    'image-caption': 'imageCaption',
    body: 'p',
};

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
        cssStyles.paddingTop = suffixPlainNumberWithPx(value.top);
        cssStyles.paddingRight = suffixPlainNumberWithPx(value.right);
        cssStyles.paddingBottom = suffixPlainNumberWithPx(value.bottom);
        cssStyles.paddingLeft = suffixPlainNumberWithPx(value.left);
    }
};

const transformStringValues = (key: string, cssStyles: TokenValues, value: string) => {
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
        case DesignTokenPropertiesEnum.info:
            cssStyles.info = value;
            break;
        case DesignTokenPropertiesEnum.note:
            cssStyles.note = value;
            break;
        case DesignTokenPropertiesEnum.tip:
            cssStyles.tip = value;
            break;
        case DesignTokenPropertiesEnum.warning:
            cssStyles.warning = value;
            break;
    }
    if (Object.keys(cssStyles.hover).length === 0) {
        delete cssStyles.hover;
    }
};

export const mapToGuidelineDesignTokens = (dataToTransform: Partial<Record<string, DesignTokenProperties>>) => {
    const transformedDesignTokens: TransformedDesignTokens = {};
    const enrichedDataToTransform = provideDefaultCalloutColors(dataToTransform);

    for (const [key, value] of Object.entries(enrichedDataToTransform)) {
        const designTokenName = TokenNameMapper[key] ?? key;
        transformedDesignTokens[designTokenName] = transformDesignTokens(value) as TokenValues;
    }
    return transformedDesignTokens;
};
