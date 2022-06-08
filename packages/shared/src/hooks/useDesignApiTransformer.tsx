import { CSSProperties } from 'react';
import { DesignApiProperties, DesignApiPropertiesEnum, StyleCategories, StyleName } from './useDesignApi';

const transformStyles = (dataToTransform: DesignApiProperties) => {
    const cssStyles: CSSProperties = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        switch (key) {
            case DesignApiPropertiesEnum.family:
                cssStyles.fontFamily = value;
                break;
            case DesignApiPropertiesEnum.weight:
                cssStyles.fontWeight = value;
                break;
            case DesignApiPropertiesEnum.size:
                cssStyles.fontSize = value;
                break;
            case DesignApiPropertiesEnum.letterspacing:
                cssStyles.letterSpacing = value;
                break;
            case DesignApiPropertiesEnum.line_height:
                cssStyles.lineHeight = value;
                break;
            case DesignApiPropertiesEnum.margin_top:
                cssStyles.marginTop = value;
                break;
            case DesignApiPropertiesEnum.margin_bottom:
                cssStyles.marginBottom = value;
                break;
            case DesignApiPropertiesEnum.uppercase:
                cssStyles.textTransform = value === '1' ? 'uppercase' : 'none';
                break;
            case DesignApiPropertiesEnum.italic:
                cssStyles.fontStyle = value === '1' ? 'italic' : '';
                break;
            case DesignApiPropertiesEnum.underline:
                cssStyles.textDecoration = value === '1' ? 'underline' : '';
                break;
            case DesignApiPropertiesEnum.color:
                cssStyles.color = value;
                break;
        }
    }
    return cssStyles;
};

export const useDesignApiTransformer = (dataToTransform: StyleCategories) => {
    const categories: StyleCategoriesTransformed = {};

    for (const [key, value] of Object.entries(dataToTransform)) {
        categories[key as StyleName] = transformStyles(value) as CSSProperties;
    }
    return categories;
};
