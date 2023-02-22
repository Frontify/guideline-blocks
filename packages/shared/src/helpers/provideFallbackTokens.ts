/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { AccentColorProperties, Appearance, DesignTokens } from '../hooks';
import { suffixPlainNumberWithPx } from '../utilities/suffixPlainNumberWithPx';

export const defaultCalloutColors: AccentColorProperties = {
    info: '#5bc0de',
    note: '#f0ad4e',
    tip: '#5cb85c',
    warning: '#d9534f',
};

export const defaultHeading1Tokens: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 'normal',
    fontSize: '30px',
    color: 'rgba(0,0,0,1)',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textDecoration: 'none',
};

export const defaultHeading2Tokens: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: '22px',
    color: 'rgba(0,0,0,1)',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textDecoration: 'none',
};

export const defaultHeading3Tokens: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'rgba(0,0,0,1)',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textDecoration: 'none',
};

export const defaultHeading4Tokens: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'rgba(0,0,0,1)',
    letterSpacing: 'normal',
    lineHeight: '1.3',
    marginTop: '0',
    marginBottom: '10px',
    textDecoration: 'none',
};

export const provideFallbackTokens = (appearanceData: Appearance): DesignTokens => {
    console.log({ appearanceData });
    return {
        ...appearanceData,
        heading1: {
            fontFamily: appearanceData.heading1?.family || defaultHeading1Tokens.fontFamily,
            fontWeight: appearanceData.heading1?.weight || defaultHeading1Tokens.fontWeight,
            fontSize: appearanceData.heading1?.size || defaultHeading1Tokens.fontSize,
            color: appearanceData.heading1?.color || defaultHeading1Tokens.color,
            letterSpacing: appearanceData.heading1?.letterspacing || defaultHeading1Tokens.letterSpacing,
            lineHeight: appearanceData.heading1?.line_height || defaultHeading1Tokens.lineHeight,
            marginTop: appearanceData.heading1?.margin_top || defaultHeading1Tokens.marginTop,
            marginBottom: appearanceData.heading1?.margin_bottom || defaultHeading1Tokens.marginBottom,
            textDecoration: appearanceData.heading1?.underline || defaultHeading1Tokens.textDecoration,
        },
        heading2: {
            family: appearanceData.heading2?.family || defaultHeading2Tokens.fontFamily,
            weight: appearanceData.heading2?.weight || defaultHeading2Tokens.fontWeight,
            size: appearanceData.heading2?.size || defaultHeading2Tokens.fontSize,
            color: appearanceData.heading2?.color || defaultHeading2Tokens.color,
            letterspacing: appearanceData.heading2?.letterspacing || defaultHeading2Tokens.letterSpacing,
            line_height: appearanceData.heading2?.line_height || defaultHeading2Tokens.lineHeight,
            margin_top: appearanceData.heading2?.margin_top || defaultHeading2Tokens.marginTop,
            margin_bottom: appearanceData.heading2?.margin_bottom || defaultHeading2Tokens.marginBottom,
            underline: appearanceData.heading2?.underline || defaultHeading2Tokens.textDecoration,
        },
        heading3: {
            family: appearanceData.heading3?.family || defaultHeading3Tokens.fontFamily,
            weight: appearanceData.heading3?.weight || defaultHeading3Tokens.fontWeight,
            size: appearanceData.heading3?.size || defaultHeading3Tokens.fontSize,
            color: appearanceData.heading3?.color || defaultHeading3Tokens.color,
            letterspacing: appearanceData.heading3?.letterspacing || defaultHeading3Tokens.letterSpacing,
            line_height: appearanceData.heading3?.line_height || defaultHeading3Tokens.lineHeight,
            margin_top: appearanceData.heading3?.margin_top || defaultHeading3Tokens.marginTop,
            margin_bottom: appearanceData.heading3?.margin_bottom || defaultHeading3Tokens.marginBottom,
            underline: appearanceData.heading3?.underline || defaultHeading3Tokens.textDecoration,
        },
        heading4: {
            family: appearanceData.heading4?.family || defaultHeading4Tokens.fontFamily,
            weight: appearanceData.heading4?.weight || defaultHeading4Tokens.fontWeight,
            size: appearanceData.heading4?.size || defaultHeading4Tokens.fontSize,
            color: appearanceData.heading4?.color || defaultHeading4Tokens.color,
            letterspacing: appearanceData.heading4?.letterspacing || defaultHeading4Tokens.letterSpacing,
            line_height: appearanceData.heading4?.line_height || defaultHeading4Tokens.lineHeight,
            margin_top: appearanceData.heading4?.margin_top || defaultHeading4Tokens.marginTop,
            margin_bottom: appearanceData.heading4?.margin_bottom || defaultHeading4Tokens.marginBottom,
            underline: appearanceData.heading4?.underline || defaultHeading4Tokens.textDecoration,
        },
        buttonPrimary: {
            paddingTop: suffixPlainNumberWithPx(appearanceData.buttonPrimary?.frame?.top) || '10px',
            paddingLeft: suffixPlainNumberWithPx(appearanceData.buttonPrimary?.frame?.left) || '10px',
            paddingRight: suffixPlainNumberWithPx(appearanceData.buttonPrimary?.frame?.right) || '10px',
            paddingBottom: suffixPlainNumberWithPx(appearanceData.buttonPrimary?.frame?.bottom) || '10px',
        },
        callout: {
            note: appearanceData.callout?.note || defaultCalloutColors.note,
            info: appearanceData.callout?.info || defaultCalloutColors.info,
            tip: appearanceData.callout?.tip || defaultCalloutColors.tip,
            warning: appearanceData.callout?.warning || defaultCalloutColors.warning,
        },
    };
};
