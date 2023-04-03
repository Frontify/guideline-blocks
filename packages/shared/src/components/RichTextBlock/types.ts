/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer } from '@frontify/fondue';
import { DesignTokens } from '@frontify/fondue/dist/components/RichTextEditor/types';

export type RichTextBlockProps = {
    settingsId: string;
    isEditing: boolean;
    setBlockSettings: (settings: Record<string, unknown>) => void;
    value?: string;
    placeholder?: string;
    designTokens?: DesignTokens;
    columns?: number;
    gap?: string;
    plugins?: PluginComposer;
};

export type SerializedTextProps = {
    value?: string;
    designTokens?: DesignTokens;
    columns?: number;
    gap?: string;
};
