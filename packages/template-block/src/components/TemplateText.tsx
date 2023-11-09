/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import {
    BlockStyles,
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
} from '@frontify/guideline-blocks-settings';
import { getTitlePlugin } from '../helpers/rtePlugin';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { Settings } from '../types';

export type TemplateTextProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    title: string;
    description: string;
    pageCount: number | undefined;
    isEditing: boolean;
    setTitle: (newValue: string, prevValue?: string) => void;
    setDescription: (newValue: string, prevValue?: string) => void;
};

export const TemplateText = ({
    appBridge,
    title,
    description,
    pageCount,
    isEditing,
    setTitle,
    setDescription,
}: TemplateTextProps) => {
    const pageCountStyles = BlockStyles[TextStyles.imageCaption];
    const memoTitleRte = useMemo(() => {
        return (
            <RichTextEditor
                id="template-block-title"
                value={title || convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={setTitle}
                isEditing={isEditing}
                plugins={getTitlePlugin()}
            />
        );
    }, [title, isEditing, setTitle]);

    const memoDescriptionRte = useMemo(() => {
        return (
            <RichTextEditor
                id="template-block-description"
                value={description || convertToRteValue()}
                placeholder="Add a description"
                onTextChange={setDescription}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        );
    }, [description, isEditing, setDescription, appBridge]);
    return (
        <div>
            <div className="tw-mb-2">
                {memoTitleRte}
                <div>
                    <span data-test-id="template-block-page-count" style={{ ...pageCountStyles }}>
                        {pageCount} pages
                    </span>
                </div>
            </div>
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
