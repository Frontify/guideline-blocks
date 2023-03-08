/* (c) Copyright Frontify Ltd., all rights reserved. */

import { hasRichTextValue, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { RichTextEditor } from '@frontify/fondue';
import React, { FC } from 'react';
import { Settings } from '../types';

type InformationSectionProps = {
    description?: string;
    isEditing: boolean;
    setBlockSettings: (newSettings: Partial<Settings>) => void;
    title?: string;
};

const DEFAULT_CONTENT_VALUE = '[{"type":"heading3","children":[{"text":""}]}]';

export const InformationSection: FC<InformationSectionProps> = ({
    description,
    isEditing,
    setBlockSettings,
    title,
}) => {
    const { designTokens } = useGuidelineDesignTokens();

    const saveDescription = (newDescription: string) => {
        description !== newDescription && setBlockSettings({ description: newDescription });
    };
    const saveTitle = (newTitle: string) => {
        title !== newTitle && setBlockSettings({ title: newTitle });
    };

    return (
        <div className="tw-flex-1 tw-space-y-2">
            {(hasRichTextValue(title) || isEditing) && (
                <div data-test-id="asset-kit-block-title">
                    <RichTextEditor
                        designTokens={designTokens}
                        value={title ?? DEFAULT_CONTENT_VALUE}
                        readonly={!isEditing}
                        onTextChange={saveTitle}
                        onBlur={saveTitle}
                        placeholder={isEditing ? 'Add a title here ...' : ''}
                        border={false}
                    />
                </div>
            )}

            {(hasRichTextValue(description) || isEditing) && (
                <div data-test-id="asset-kit-block-description">
                    <RichTextEditor
                        designTokens={designTokens}
                        readonly={!isEditing}
                        onTextChange={saveDescription}
                        onBlur={saveDescription}
                        placeholder={isEditing ? 'Add a description here ...' : ''}
                        value={description}
                        border={false}
                    />
                </div>
            )}
        </div>
    );
};
