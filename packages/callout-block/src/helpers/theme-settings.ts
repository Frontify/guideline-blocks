/* (c) Copyright Frontify Ltd., all rights reserved. */

import { THEME_PREFIX } from '@frontify/guideline-blocks-settings';
import { type CSSProperties } from 'react';

import { Icon } from '../types';

export const getOverwrittenThemeSettings = (textColor: string, iconType: Icon): CSSProperties => {
    const marginResetStyles: Record<string, string> =
        iconType !== Icon.None
            ? {
                  [`${THEME_PREFIX}body-margin-top`]: '0px',
                  [`${THEME_PREFIX}body-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}heading1-margin-top`]: '0px',
                  [`${THEME_PREFIX}heading1-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}heading2-margin-top`]: '0px',
                  [`${THEME_PREFIX}heading2-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}heading3-margin-top`]: '0px',
                  [`${THEME_PREFIX}heading3-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}heading4-margin-top`]: '0px',
                  [`${THEME_PREFIX}heading4-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}custom1-margin-top`]: '0px',
                  [`${THEME_PREFIX}custom1-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}custom2-margin-top`]: '0px',
                  [`${THEME_PREFIX}custom2-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}custom3-margin-top`]: '0px',
                  [`${THEME_PREFIX}custom3-margin-bottom`]: '0px',
                  [`${THEME_PREFIX}quote-margin-top`]: '0px',
                  [`${THEME_PREFIX}quote-margin-bottom`]: '0px',
              }
            : {};

    return {
        [`${THEME_PREFIX}heading1-color`]: textColor,
        [`${THEME_PREFIX}heading2-color`]: textColor,
        [`${THEME_PREFIX}heading3-color`]: textColor,
        [`${THEME_PREFIX}heading4-color`]: textColor,
        [`${THEME_PREFIX}custom1-color`]: textColor,
        [`${THEME_PREFIX}custom2-color`]: textColor,
        [`${THEME_PREFIX}custom3-color`]: textColor,
        [`${THEME_PREFIX}body-color`]: textColor,
        [`${THEME_PREFIX}quote-color`]: textColor,
        [`${THEME_PREFIX}link-color`]: textColor,
        [`${THEME_PREFIX}link-text-decoration`]: 'underline',
        ...marginResetStyles,
        color: textColor,
    } as CSSProperties;
};
