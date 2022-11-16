/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { RadiusExtendedSettings } from '@frontify/guideline-blocks-shared';
import { Globals, Property } from 'csstype';
import { CSSProperties } from 'react';

export type Language =
    | 'coffeescript'
    | 'css'
    | 'sass'
    | 'haml'
    | 'html'
    | 'java'
    | 'javascript'
    | 'json'
    | 'jsp'
    | 'jsx'
    | 'kotlin'
    | 'livescript'
    | 'markdown'
    | 'jade'
    | 'plaintext'
    | 'php'
    | 'shell'
    | 'slim'
    | 'sql'
    | 'swift'
    | 'typescript'
    | 'tsx'
    | 'xml'
    | 'yaml';

export type Theme =
    | 'default'
    | 'androidstudio'
    | 'atomone'
    | 'bbedit'
    | 'bespin'
    | 'darcula'
    | 'dracula'
    | 'duotoneDark'
    | 'duotoneLight'
    | 'eclipse'
    | 'githubDark'
    | 'githubLight'
    | 'gruvboxDark'
    | 'okaidia'
    | 'sublime'
    | 'xcodeDark'
    | 'xcodeLight';

export type TwBorderInlineStyle = Exclude<
    Property.BorderInlineStyle,
    Globals | 'groove' | 'inset' | 'outset' | 'ridge' | 'hidden'
>;

export interface CodeMirrorEditorStyle extends CSSProperties {
    '--editor-border': Property.Border;
    '--editor-border-radius': Property.BorderRadius;
}

export type BorderRadiusSize = '0px' | '2px' | '4px' | '12px';

export type Settings = {
    theme?: Theme;
    content?: string;
    borderColor: Color;
    language?: Language;
    hasBorder?: boolean;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    borderStyle: TwBorderInlineStyle;
    borderWidth: Property.BorderWidth;
} & RadiusExtendedSettings;

export type CodeSnippetProps = {
    appBridge: AppBridgeBlock;
};
