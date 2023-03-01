/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';

type CalloutColors = {
    info: string;
    note: string;
    tip: string;
    warning: string;
};

type ButtonHoverProperties = {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
};

const defaultHeadingTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#000000',
};

export const defaultHeading1Tokens: CSSProperties = {
    ...defaultHeadingTokens,
    fontSize: '30px',
};

export const defaultHeading2Tokens: CSSProperties = {
    ...defaultHeadingTokens,
    fontWeight: 'bold',
    fontSize: '22px',
};

export const defaultHeading3Tokens: CSSProperties = {
    ...defaultHeadingTokens,
    fontWeight: 'bold',
    fontSize: '18px',
};

export const defaultHeading4Tokens: CSSProperties = {
    ...defaultHeadingTokens,
    fontWeight: 'bold',
    fontSize: '16px',
};

export const defaultCustomTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    fontSize: '16px',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: 'rgba(0,0,0,1)',
};

export const defaultBodyTextTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '15px',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#676767',
};

export const defaultLinkTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '15px',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#4a90e2',
};

export const defaultQuoteTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '24px',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#676767',
};

export const defaultImageTitleTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '15px',
    letterSpacing: 'normal',
    lineHeight: '1.4',
    marginTop: '0px',
    marginBottom: '3px',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#000000',
};

export const defaultImageCaptionTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '13.5px',
    letterSpacing: 'normal',
    lineHeight: '1.5',
    textTransform: 'none',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#999999',
};

export const defaultCalloutColors: CalloutColors = {
    info: '#5bc0de',
    note: '#f0ad4e',
    tip: '#5cb85c',
    warning: '#d9534f',
};

const defaultButtonTokens: CSSProperties = {
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '1.3',
    textTransform: 'none',
    fontStyle: 'normal',
    borderWidth: '2px',
    borderRadius: '5px',
    paddingTop: '10px',
    paddingRight: '20px',
    paddingBottom: '10px',
    paddingLeft: '20px',
};

export const defaultButtonPrimaryTokens: CSSProperties & { hover?: ButtonHoverProperties } = {
    ...defaultButtonTokens,
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e5',
    color: '#666666',
    hover: {
        backgroundColor: '#d8d8d8',
        borderColor: '#ababab',
        color: '#4c4c4c',
    },
};

export const defaultButtonSecondaryTokens: CSSProperties & { hover?: ButtonHoverProperties } = {
    ...defaultButtonTokens,
    backgroundColor: '#e6e6e6',
    borderColor: '#cfcfcf',
    color: '#666666',
    hover: {
        backgroundColor: '#c3c3c3',
        borderColor: '#9b9b9b',
        color: '#4c4c4c',
    },
};

export const defaultButtonTertiaryTokens: CSSProperties & { hover?: ButtonHoverProperties } = {
    ...defaultButtonTokens,
    backgroundColor: '#ffffff',
    borderColor: '#bfbfbf',
    color: '#b2b2b2',
    hover: {
        backgroundColor: '#ffffff',
        borderColor: '#7f7f7f',
        color: '#7f7f7f',
    },
};

export const defaultGuidelineDesignTokens = {
    heading1: defaultHeading1Tokens,
    heading2: defaultHeading2Tokens,
    heading3: defaultHeading3Tokens,
    heading4: defaultHeading4Tokens,
    custom1: defaultCustomTokens,
    custom2: defaultCustomTokens,
    custom3: defaultCustomTokens,
    p: defaultBodyTextTokens,
    link: defaultLinkTokens,
    quote: defaultQuoteTokens,
    imageTitle: defaultImageTitleTokens,
    imageCaption: defaultImageCaptionTokens,
    buttonPrimary: defaultButtonPrimaryTokens,
    buttonSecondary: defaultButtonSecondaryTokens,
    buttonTertiary: defaultButtonTertiaryTokens,
    callout: defaultCalloutColors,
};
