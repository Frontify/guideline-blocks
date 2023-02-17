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
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    value={title ?? DEFAULT_CONTENT_VALUE}
                    readonly={!isEditing}
                    onTextChange={saveTitle}
                    onBlur={saveTitle}
                    placeholder={isEditing ? 'Add a title here ...' : ''}
                    border={false}
                />
            )}

            {(hasRichTextValue(description) || isEditing) && (
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    readonly={!isEditing}
                    onTextChange={saveDescription}
                    onBlur={saveDescription}
                    placeholder={isEditing ? 'Add a description here ...' : ''}
                    value={description}
                    border={false}
                />
            )}
        </div>
    );
};
