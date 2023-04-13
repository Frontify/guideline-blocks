/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens, PluginComposer } from '@frontify/fondue';

export type RichTextEditorProps = {
    isEditing: boolean;
    value?: string;
    placeholder?: string;
    designTokens?: DesignTokens;
    columns?: number;
    gap?: string;
    plugins?: PluginComposer;
    updateValueOnChange?: boolean;
    onBlur: (value: string) => void;
};

export type SerializedTextProps = {
    value?: string;
    designTokens?: DesignTokens;
    columns?: number;
    gap?: string;
};
