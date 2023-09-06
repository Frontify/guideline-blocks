/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiFontStyle } from './types';
import { Choice, Radius, radiusStyleMap } from '@frontify/guideline-blocks-settings';

export const getFonts = async (projectId: number): Promise<Choice[]> => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    const fonts: Choice[] = responseJson.data.map(({ name, css_family_name }: ApiFontStyle) => ({
        label: name,
        value: css_family_name,
    }));
    return fonts.filter((font, index, self) => self.findIndex(({ value }) => value === font.value) === index);
};

export const getFontWeights = async (projectId: number, font: string): Promise<Choice[]> => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    const fontStyles: ApiFontStyle[] = responseJson.data.filter(
        (fontStyle: ApiFontStyle) => fontStyle.name === font && fontStyle.font_style === 'normal'
    );
    const fontWeights: Choice[] = fontStyles.map(({ font_weight }: ApiFontStyle) => ({
        label: font_weight,
        value: font_weight,
    }));
    return fontWeights.filter((font, index, self) => self.findIndex(({ value }) => value === font.value) === index);
};

export const getRadiusValue = (radiusChoice: Radius, hasRadius = false, radiusValue?: string): string =>
    hasRadius ? radiusValue || '0px' : radiusStyleMap[radiusChoice];
