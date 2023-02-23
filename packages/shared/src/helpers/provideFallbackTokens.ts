/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { ApiAppearanceData, ApiProperties, CalloutColors, DesignTokens } from '../hooks';
import { suffixPlainNumberWithPx } from '../utilities/suffixPlainNumberWithPx';
import {
    defaultButtonPrimaryTokens,
    defaultButtonSecondaryTokens,
    defaultButtonTertiaryTokens,
    defaultCalloutColors,
    defaultHeading1Tokens,
    defaultHeading2Tokens,
    defaultHeading3Tokens,
    defaultHeading4Tokens,
} from './defaultTokens';

const getHeadingTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => {
    return {
        fontFamily: appearanceData?.family || defaults.fontFamily,
        fontWeight: appearanceData?.weight || defaults.fontWeight,
        fontSize: appearanceData?.size || defaults.fontSize,
        color: appearanceData?.color || defaults.color,
        letterSpacing: appearanceData?.letterspacing || defaults.letterSpacing,
        lineHeight: appearanceData?.line_height || defaults.lineHeight,
        marginTop: appearanceData?.margin_top || defaults.marginTop,
        marginBottom: appearanceData?.margin_bottom || defaults.marginBottom,
        textDecoration: appearanceData?.underline || defaults.textDecoration,
    };
};

const getButtonTokens = (defaults: CSSProperties, appearanceData?: ApiProperties): CSSProperties => ({
    fontFamily: appearanceData?.family || defaults.fontFamily,
    fontWeight: appearanceData?.weight || defaults.fontWeight,
    fontSize: appearanceData?.size || defaults.fontSize,
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
});

const getCalloutTokens = (defaults: CalloutColors, appearanceData?: ApiProperties): CalloutColors => ({
    info: appearanceData?.info || defaults.info,
    note: appearanceData?.note || defaults.note,
    tip: appearanceData?.tip || defaults.tip,
    warning: appearanceData?.warning || defaults.warning,
});

export const provideFallbackTokens = (appearanceData: ApiAppearanceData): DesignTokens => {
    console.log({ appearanceData });
    return {
        heading1: getHeadingTokens(defaultHeading1Tokens, appearanceData.heading1),
        heading2: getHeadingTokens(defaultHeading2Tokens, appearanceData.heading2),
        heading3: getHeadingTokens(defaultHeading3Tokens, appearanceData.heading3),
        heading4: getHeadingTokens(defaultHeading4Tokens, appearanceData.heading4),
        buttonPrimary: getButtonTokens(defaultButtonPrimaryTokens, appearanceData.buttonPrimary),
        buttonSecondary: getButtonTokens(defaultButtonSecondaryTokens, appearanceData.buttonSecondary),
        buttonTertiary: getButtonTokens(defaultButtonTertiaryTokens, appearanceData.buttonTertiary),
        callout: getCalloutTokens(defaultCalloutColors, appearanceData.callout),
    };
};
