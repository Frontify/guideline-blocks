/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import {
    DesignTokenName,
    DesignTokenProperties,
    DesignTokenPropertiesEnum,
    DesignTokens,
    TransformedDesignTokens,
} from '../hooks/useGuidelineDesignTokens';

const transformDesignTokens = (dataToTransform: DesignTokenProperties) => {
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
    const transformedDesignTokens: TransformedDesignTokens = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        transformedDesignTokens[key as DesignTokenName] = transformDesignTokens(value) as CSSProperties;
    }
    return transformedDesignTokens;
};
