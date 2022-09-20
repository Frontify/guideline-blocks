/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { Color } from '@frontify/fondue';
import { Globals, Property } from 'csstype';
import { AppBridgeBlock } from '@frontify/app-bridge';

export type Language = 'js' | 'html' | 'css' | 'php' | 'json' | 'jsx' | 'ts';

export type Theme =
    | 'cobalt'
    | 'default'
    | 'dracula'
    | 'oneDark'
    | 'oneLight'
    | 'evaLight'
    | 'base16Dark'
    | 'gitHubDark'
    | 'gitHubLight'
    | 'base16Light'
    | 'materialDarker'
    | 'materialLighter'
    | 'materialPalenight';

export type TwBorderInlineStyle = Exclude<
    Property.BorderInlineStyle,
    Globals | 'groove' | 'inset' | 'outset' | 'ridge' | 'hidden'
>;

export interface CodeMirrorEditorStyle extends CSSProperties {
    '--editor-border': Property.Border;
    '--editor-padding': Property.Padding;
    '--editor-border-radius': Property.BorderRadius;
    '--editor-border-top-left-radius': Property.BorderTopLeftRadius;
    '--editor-border-top-right-radius': Property.BorderTopRightRadius;
    '--editor-border-bottom-left-radius': Property.BorderBottomLeftRadius;
    '--editor-border-bottom-right-radius': Property.BorderBottomRightRadius;
}

export type PaddingSize = '0px' | '24px' | '36px' | '60px';
export type BorderRadiusSize = '0px' | '2px' | '4px' | '12px';
export type BorderRadiusCorners = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type Settings = {
    theme?: Theme;
    content?: string;
    borderColor: Color;
    language?: Language;
    withBorder?: boolean;
    withHeading?: boolean;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
    padding?: PaddingSize;
    withRowNumbers?: boolean;
    borderRadiusTopLeft?: string;
    borderRadiusTopRight?: string;
    borderRadiusBottomRight?: string;
    borderRadiusBottomLeft?: string;
    withCustomPadding?: boolean;
    lineStyle: TwBorderInlineStyle;
    borderRadius?: BorderRadiusSize;
    lineWidth: Property.BorderWidth;
    withCustomBorderRadius?: boolean;
};

export type CodeMirrorEditorProps = {
    id?: string;
    theme: Theme;
    initValue?: string;
    isEditing?: boolean;
    language?: Language;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    border?: Property.Border;
    padding?: Property.Padding;
    onChange: (value: string) => void;
    borderRadius: Record<BorderRadiusCorners, string>;
};

export type CodeSnippetProps = {
    appBridge: AppBridgeBlock;
};
