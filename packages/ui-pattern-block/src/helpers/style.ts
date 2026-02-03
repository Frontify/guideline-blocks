/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from '@frontify/fondue';
import { type Radius, getBackgroundColorStyles } from '@frontify/guideline-blocks-settings';

import { type Height, type Padding, heightValues, paddingValues, radiusValues } from '../types';

/* The internal CodeMirror component covers the box-shadow inset styles applied by fondue.
    To make them visible they are applied to a psuedo element instead. This way they also don't overflow
    the UI Pattern container which has border radius and "overflow: hidden". */

const FOCUS_VISIBLE_INSET_AFTER =
    'focus-visible:after:tw-ring-inset focus:tw-z-20 focus-visible:after:tw-absolute focus-visible:after:tw-top-0 focus-visible:after:tw-left-0 focus-visible:after:tw-right-0 focus-visible:after:tw-bottom-0 focus-visible:after:tw-ring-4 focus-visible:after:tw-ring-blue focus-visible:after:tw-ring-offset-2 focus-visible:after:tw-outline-none';

export const EDITOR_CLASSES = {
    'sp-layout': 'tw-gap-0 tw-border-none tw-rounded-none !tw-overflow-visible',
    'sp-wrapper': 'tw-border-b tw-border-line group-[.bordered]:last:tw-border-b-0',
    'sp-editor': 'tw-min-h-[52px] tw-box-content',
    'sp-preview': '!tw-flex-[unset]',
    'sp-preview-container': 'tw-h-full tw-bg-[inherit]',
    'sp-preview-iframe': 'tw-min-h-0 tw-flex-[unset]',
    'sp-loading': 'tw-bg-[inherit]',
    'sp-cm': `tw-relative ${FOCUS_VISIBLE_INSET_AFTER}`,
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
