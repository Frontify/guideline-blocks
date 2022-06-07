import { CSSProperties } from 'react';
import { DesignApiProperties, DesignApiPropertiesEnum, DesignApiResponse, StyleCategories } from './useDesignApi';

const transformStyles = (dataToTransform: DesignApiProperties) => {
    const cssStyles: CSSProperties = {};

    Object.entries(dataToTransform).map(([key, value]) => {
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
    });
    return cssStyles;
};

export const useDesignApiTransformer = (dataToTransform: DesignApiResponse<DesignApiProperties>) => {
    const categories: StyleCategories<CSSProperties> = {};

    Object.entries(dataToTransform.hub.appearance).map(([key, value]) => {
        categories[key as keyof typeof dataToTransform.hub.appearance] = transformStyles(value);
    });
    return categories;
};
