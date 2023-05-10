/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Choice } from '@frontify/guideline-blocks-settings';
import { ApiFontStyle } from './types';

export const getFonts = async (projectId: number): Promise<Choice[]> => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    const fonts = responseJson.data.map((fontStyle: ApiFontStyle) => ({
        label: fontStyle.name,
        value: fontStyle.css_family_name,
    }));
    const uniqueFonts = fonts.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (font: { value: any }, index: any, self: any[]) => self.findIndex((f) => f.value === font.value) === index
    );
    return uniqueFonts;
};

export const getFontWeights = async (projectId: number, font: string): Promise<Choice[]> => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    const fontStyles = responseJson.data.filter(
        (fontStyle: ApiFontStyle) => fontStyle.name === font && fontStyle.font_style === 'normal'
    );
    const fontWeights = fontStyles.map((fontStyle: ApiFontStyle) => {
        return {
            label: fontStyle.font_weight,
            value: fontStyle.font_weight,
        };
    });
    const uniqueFontWeights = fontWeights.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (font: { value: any }, index: any, self: any[]) => self.findIndex((f) => f.value === font.value) === index
    );
    return uniqueFontWeights;
};
