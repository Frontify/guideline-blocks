/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { Color } from '@frontify/fondue';
import { Globals, Property } from 'csstype';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { RadiusExtendedSettings } from '@frontify/guideline-blocks-shared';

export type Language =
    | 'js'
    | 'html'
    | 'css'
    | 'php'
    | 'json'
    | 'jsx'
    | 'ts'
    | 'java'
    | 'markdown'
    | 'xml'
    | 'sql'
    | 'slim';

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

export type CodeMirrorEditorProps = {
    id?: string;
    theme: Theme;
    initValue?: string;
    isEditing?: boolean;
    language?: Language;
    withHeading?: boolean;
    withRowNumbers?: boolean;
    border?: Property.Border;
    onChange: (value: string) => void;
    borderRadius: Property.BorderRadius;
};

export type CodeSnippetProps = {
    appBridge: AppBridgeBlock;
};
