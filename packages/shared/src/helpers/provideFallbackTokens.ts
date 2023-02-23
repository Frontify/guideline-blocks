/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { ApiAppearanceData, ApiProperties, ButtonHoverProperties, CalloutColors, DesignTokens } from '../hooks';
import { suffixPlainNumberWithPx } from '../utilities/suffixPlainNumberWithPx';
import {
    defaultBodyTextTokens,
    defaultButtonPrimaryTokens,
    defaultButtonSecondaryTokens,
    defaultButtonTertiaryTokens,
    defaultCalloutColors,
    defaultCustomTokens,
    defaultHeading1Tokens,
    defaultHeading2Tokens,
    defaultHeading3Tokens,
    defaultHeading4Tokens,
    defaultLinkTokens,
} from './defaultTokens';

const getHeadingTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
    letterSpacing: appearanceData?.letterspacing || defaults.letterSpacing,
    lineHeight: appearanceData?.line_height || defaults.lineHeight,
    marginTop: appearanceData?.margin_top || defaults.marginTop,
    marginBottom: appearanceData?.margin_bottom || defaults.marginBottom,
    textTransform: appearanceData?.uppercase ? 'uppercase' : defaults.textTransform,
    fontStyle: appearanceData?.italic ? 'italic' : defaults.fontStyle,
    textDecoration: appearanceData?.underline ? 'underline' : defaults.textDecoration,
    color: appearanceData?.color || defaults.color,
});

const getCustomTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
    letterSpacing: appearanceData?.letterspacing || defaults.letterSpacing,
    lineHeight: appearanceData?.line_height || defaults.lineHeight,
    marginTop: appearanceData?.margin_top || defaults.marginTop,
    marginBottom: appearanceData?.margin_bottom || defaults.marginBottom,
    textTransform: appearanceData?.uppercase ? 'uppercase' : defaults.textTransform,
    fontStyle: appearanceData?.italic ? 'italic' : defaults.fontStyle,
    textDecoration: appearanceData?.underline ? 'underline' : defaults.textDecoration,
    color: appearanceData?.color || defaults.color,
});

const getParagraphTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
    letterSpacing: appearanceData?.letterspacing || defaults.letterSpacing,
    lineHeight: appearanceData?.line_height || defaults.lineHeight,
    textTransform: appearanceData?.uppercase ? 'uppercase' : defaults.textTransform,
    fontStyle: appearanceData?.italic ? 'italic' : defaults.fontStyle,
    textDecoration: appearanceData?.underline ? 'underline' : defaults.textDecoration,
    color: appearanceData?.color || defaults.color,
});

const getLinkTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
    letterSpacing: appearanceData?.letterspacing || defaults.letterSpacing,
    lineHeight: appearanceData?.line_height || defaults.lineHeight,
    textTransform: appearanceData?.uppercase ? 'uppercase' : defaults.textTransform,
    fontStyle: appearanceData?.italic ? 'italic' : defaults.fontStyle,
    textDecoration: appearanceData?.underline ? 'underline' : defaults.textDecoration,
    color: appearanceData?.color || defaults.color,
});

const getButtonTokens = (
    defaults: CSSProperties & { hover?: ButtonHoverProperties },
    appearanceData?: ApiProperties
): CSSProperties & { hover?: ButtonHoverProperties } => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
    lineHeight: appearanceData?.line_height || defaults.lineHeight,
    textTransform: appearanceData?.uppercase ? 'uppercase' : defaults.textTransform,
    fontStyle: appearanceData?.italic ? 'italic' : defaults.fontStyle,
    borderWidth: appearanceData?.border_width || defaults.borderWidth,
    borderRadius: appearanceData?.border_radius || defaults.borderRadius,
    paddingTop: appearanceData?.frame?.top ? suffixPlainNumberWithPx(appearanceData?.frame?.top) : defaults.paddingTop,
    paddingRight: appearanceData?.frame?.right
        ? suffixPlainNumberWithPx(appearanceData?.frame?.right)
        : defaults.paddingRight,
    paddingBottom: appearanceData?.frame?.bottom
        ? suffixPlainNumberWithPx(appearanceData?.frame?.bottom)
        : defaults.paddingBottom,
    paddingLeft: appearanceData?.frame?.left
        ? suffixPlainNumberWithPx(appearanceData?.frame?.left)
        : defaults.paddingLeft,
    backgroundColor: appearanceData?.background_color || defaults.backgroundColor,
    borderColor: appearanceData?.border_color || defaults.borderColor,
    color: appearanceData?.color || defaults.color,
    hover: {
        backgroundColor: appearanceData?.hover?.background_color || defaults.hover?.backgroundColor,
        borderColor: appearanceData?.hover?.border_color || defaults.hover?.borderColor,
        color: appearanceData?.hover?.color || defaults.hover?.color,
    },
});

const getCalloutTokens = (defaults: CalloutColors, appearanceData?: ApiProperties): CalloutColors => ({
    info: appearanceData?.info || defaults.info,
    note: appearanceData?.note || defaults.note,
    tip: appearanceData?.tip || defaults.tip,
    warning: appearanceData?.warning || defaults.warning,
});

export const provideFallbackTokens = (appearanceData: ApiAppearanceData): DesignTokens => ({
    heading1: getHeadingTokens(defaultHeading1Tokens, appearanceData.heading1),
    heading2: getHeadingTokens(defaultHeading2Tokens, appearanceData.heading2),
    heading3: getHeadingTokens(defaultHeading3Tokens, appearanceData.heading3),
    heading4: getHeadingTokens(defaultHeading4Tokens, appearanceData.heading4),
    custom1: getCustomTokens(defaultCustomTokens, appearanceData.custom1),
    custom2: getCustomTokens(defaultCustomTokens, appearanceData.custom2),
    custom3: getCustomTokens(defaultCustomTokens, appearanceData.custom3),
    p: getParagraphTokens(defaultBodyTextTokens, appearanceData.p),
    link: getLinkTokens(defaultLinkTokens, appearanceData.link),
    buttonPrimary: getButtonTokens(defaultButtonPrimaryTokens, appearanceData.buttonPrimary),
    buttonSecondary: getButtonTokens(defaultButtonSecondaryTokens, appearanceData.buttonSecondary),
    buttonTertiary: getButtonTokens(defaultButtonTertiaryTokens, appearanceData.buttonTertiary),
    callout: getCalloutTokens(defaultCalloutColors, appearanceData.callout),
});
