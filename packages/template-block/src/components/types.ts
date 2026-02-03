/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock, type Asset, type Template } from '@frontify/app-bridge';

import { type Settings } from '../types';

export type AlertErrorProps = {
    errorMessage: string;
};

export type CtaButtonProps = {
    appBridge: AppBridgeBlock;
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
    previewCustom: Asset | null;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    onOpenTemplateChooser: () => void;
    handleDeleteCustomPreview: (assetId: number) => void;
};

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    previewCustom: Asset | null;
    previewClasses: string;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    onOpenTemplateChooser: () => void;
    handleNewPublication: () => void;
    handleDeleteCustomPreview: (assetId: number) => void;
};

export type TemplateTextProps = {
    appBridge: AppBridgeBlock;
    title: string;
    description: string;
    pageCount: number | undefined;
    isEditing: boolean;
    hasTitleOnly: boolean;
    templateTextKey: number;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
};
