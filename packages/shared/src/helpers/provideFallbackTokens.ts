/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { ApiAppearance, ApiProperties, CalloutColors, DesignTokens } from '../hooks';
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

const getHeadingTokens = (defaults: CSSProperties, apiProperties?: ApiProperties): CSSProperties => ({
    fontFamily: apiProperties?.family || defaults.fontFamily,
    fontWeight: apiProperties?.weight || defaults.fontWeight,
    fontSize: apiProperties?.size || defaults.fontSize,
    color: apiProperties?.color || defaults.color,
    letterSpacing: apiProperties?.letterspacing || defaults.letterSpacing,
    lineHeight: apiProperties?.line_height || defaults.lineHeight,
    marginTop: apiProperties?.margin_top || defaults.marginTop,
    marginBottom: apiProperties?.margin_bottom || defaults.marginBottom,
    textDecoration: apiProperties?.underline || defaults.textDecoration,
});

const getButtonTokens = (defaults: CSSProperties, apiProperties?: ApiProperties): CSSProperties => ({
    fontFamily: apiProperties?.family || defaults.fontFamily,
    fontWeight: apiProperties?.weight || defaults.fontWeight,
    fontSize: apiProperties?.size || defaults.fontSize,
    paddingTop: apiProperties?.frame?.top ? suffixPlainNumberWithPx(apiProperties?.frame?.top) : defaults.paddingTop,
    paddingRight: apiProperties?.frame?.right
        ? suffixPlainNumberWithPx(apiProperties?.frame?.right)
        : defaults.paddingRight,
    paddingBottom: apiProperties?.frame?.bottom
        ? suffixPlainNumberWithPx(apiProperties?.frame?.bottom)
        : defaults.paddingBottom,
    paddingLeft: apiProperties?.frame?.left
        ? suffixPlainNumberWithPx(apiProperties?.frame?.left)
        : defaults.paddingLeft,
});

const getCalloutTokens = (defaults: CalloutColors, apiProperties?: ApiProperties['callout']): CalloutColors => ({
    info: apiProperties?.info || defaults.info,
    note: apiProperties?.note || defaults.note,
    tip: apiProperties?.tip || defaults.tip,
    warning: apiProperties?.warning || defaults.warning,
});

export const provideFallbackTokens = (appearanceData: ApiAppearance): DesignTokens => {
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
