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
    '--editor-margin': Property.Margin;
    '--editor-border-radius': Property.BorderRadius;
}

export type MarginSize = '0px' | '24px' | '36px' | '60px';
export type BorderRadiusSize = '0px' | '2px' | '4px' | '12px';

export type Settings = {
    theme?: Theme;
    content?: string;
    borderColor: Color;
    language?: Language;
    withBorder?: boolean;
    withHeading?: boolean;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
    margin?: MarginSize;
    withRowNumbers?: boolean;
    borderRadiusTopLeft?: string;
    borderRadiusTopRight?: string;
    borderRadiusBottomRight?: string;
    borderRadiusBottomLeft?: string;
    withCustomMargin?: boolean;
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
    margin?: Property.Margin;
    onChange: (value: string) => void;
    borderRadius: Property.BorderRadius;
};

export type CodeSnippetProps = {
    appBridge: AppBridgeBlock;
};
