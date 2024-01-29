/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Radius, getBackgroundColorStyles } from '@frontify/guideline-blocks-settings';
import { Height, Padding, heightValues, paddingValues, radiusValues } from '../types';
import { type Color, FOCUS_VISIBLE_STYLE } from '@frontify/fondue';

export const EDITOR_CLASSES = {
    'sp-layout': 'tw-gap-0 tw-border-none tw-rounded-none !tw-overflow-visible',
    'sp-wrapper': 'tw-border-b tw-border-line tw-min-h-[52px] tw-box-content last:tw-border-b-0',
    'sp-preview': '!tw-flex-[unset]',
    'sp-preview-container': 'tw-h-full tw-bg-[inherit]',
    'sp-preview-iframe': 'tw-min-h-0 tw-flex-[unset]',
    'sp-loading': 'tw-bg-[inherit]',
    'sp-cm': `${FOCUS_VISIBLE_STYLE} tw-relative focus:tw-z-20`,
};

export const getPaddingStyle = (hasCustomPadding: boolean, paddingValue: string, paddingChoice: Padding) => {
    return !hasCustomPadding ? paddingValues[paddingChoice] : paddingValue;
};

export const getHeightStyle = (hasCustomHeight: boolean, heightValue: string, heightChoice: Height) => {
    return !hasCustomHeight ? heightValues[heightChoice] : heightValue;
};

export const getRadiusValue = (hasRadius: boolean, radiusValue: number | undefined, radiusChoice: Radius) => {
    return hasRadius ? radiusValue : radiusValues[radiusChoice];
};

export const centeringCss = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const getBackgroundCss = (backgroundColor: Color) => {
    return `
        background-color: ${getBackgroundColorStyles(backgroundColor).backgroundColor};
    `;
};

export const getCssToInject = (fluidHeight: boolean, ...extraRules: string[]) => {
    return `
        html {
            ${fluidHeight ? '' : 'height: 100%;'}
            display: flex;
            flex-direction: column;
        }
        body {
            flex: 1;
            padding: 8px;
            margin: 0px;
            display: flex;
            flex-direction: column;
            ${extraRules.join('\n')}
        }
    `;
};

export const getScriptToInject = (cssToInject: string) => {
    const script = `
        const tag = document.createElement('style');
        tag.innerHTML = \`${cssToInject}\`;
        document.head.appendChild(tag);
    `;
    return `data:text/javascript;base64,${btoa(script)}`;
};
