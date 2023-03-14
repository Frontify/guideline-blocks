/* (c) Copyright Frontify Ltd., all rights reserved. */

import { hasRichTextValue, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { RichTextEditor } from '@frontify/fondue';
import { InformationSectionProps } from '../types';

const DEFAULT_CONTENT_VALUE = '[{"type":"heading3","children":[{"text":""}]}]';

export const InformationSection = ({ description, isEditing, setBlockSettings, title }: InformationSectionProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const saveDescription = (newDescription: string) => {
        if (description !== newDescription) {
            setBlockSettings({ description: newDescription });
        }
    };

    const saveTitle = (newTitle: string) => {
        if (title !== newTitle) {
            setBlockSettings({ title: newTitle });
        }
    };

    return (
        <div className="tw-flex-1 tw-space-y-2">
            {hasRichTextValue(title) || isEditing ? (
                <div data-test-id="block-title">
                    <RichTextEditor
                        designTokens={designTokens}
                        value={title ?? DEFAULT_CONTENT_VALUE}
                        readonly={!isEditing}
                        onBlur={saveTitle}
                        placeholder={isEditing ? 'Add a title here ...' : ''}
                        border={false}
                    />
                </div>
            ) : null}

            {hasRichTextValue(description) || isEditing ? (
                <div data-test-id="block-description">
                    <RichTextEditor
                        designTokens={designTokens}
                        readonly={!isEditing}
                        onBlur={saveDescription}
                        placeholder={isEditing ? 'Add a description here ...' : ''}
                        value={description}
                        border={false}
                    />
                </div>
            ) : null}
        </div>
    );
};
