/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { Color } from '@frontify/arcade';
import { Globals, Property } from 'csstype';
import { AppBridgeNative } from '@frontify/app-bridge';

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

export type BorderTuple = [TwBorderInlineStyle, Property.BorderWidth, Color];

export type PaddingTuple = [string, string, string, string];

export type BorderRadiusTuple = [string, string, string, string];

export interface CodeMirrorEditorStyle extends CSSProperties {
    '--editor-border': Property.Border;
    '--editor-padding': Property.Padding;
    '--editor-border-radius': Property.BorderRadius;
}

export type PaddingSize = '0px' | '6rem' | '9rem' | '15rem';
export type BorderRadiusSize = '0px' | '2px' | '4px' | '12px';

export type Settings = {
    theme?: Theme;
    language?: Language;
    padding?: PaddingSize;
    borderRadius?: BorderRadiusSize;
    border?: BorderTuple;
    withBorder?: boolean;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    withCustomPadding?: boolean;
    withCustomBorderRadius?: boolean;
    customPadding?: PaddingTuple;
    customBorderRadius?: BorderRadiusTuple;
    content?: string;
};

export type CodeMirrorEditorProps = {
    id?: string;
    theme: Theme;
    language?: Language;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    border?: Property.Border;
    padding?: Property.Padding;
    borderRadius?: Property.BorderRadius;
    initValue?: string;
    onChange?: (value: string) => void;
};

export type CodeSnippetProps = {
    id?: string;
    appBridge: AppBridgeNative;
};
