/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Template } from '@frontify/app-bridge';
import { Settings } from '../types';

export type AlertErrorProps = {
    errorMessage: string;
};

export type CustomButtonProps = {
    blockSettings: Settings;
    isEditing: boolean;
    isDisabled: boolean;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    handleNewPublication: () => void;
};

export type PreviewImageProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    onOpenTemplateChooser: () => void;
};

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    onOpenTemplateChooser: () => void;
    isRows: boolean;
};

export type TemplateTextProps = {
    appBridge: AppBridgeBlock;
    title: string;
    description: string;
    pageCount: number | undefined;
    isEditing: boolean;
    key: string;
    setTitle: (newTitle: string) => void;
    setDescription: (newDescription: string) => void;
};
