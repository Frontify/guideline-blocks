/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue';
import { DesignTokens } from '@frontify/fondue/dist/components/RichTextEditor/types';

export type RichTextEditorProps = {
    id: string;
    isEditing: boolean;
    value?: string;
    placeholder?: string;
    designTokens?: DesignTokens;
    columns?: number;
    gap?: string;
    plugins?: PluginComposer;
    updateValueOnChange?: boolean;
    showSerializedText?: boolean;
    onBlur: (value: string) => void;
};

export type SerializedTextProps = {
    value?: string;
    designTokens?: DesignTokens;
    show?: boolean;
    columns?: number;
    gap?: string;
};
