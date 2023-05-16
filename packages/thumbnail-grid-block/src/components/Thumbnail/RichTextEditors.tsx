/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Thumbnail } from '../../types';
import { RichTextEditor, convertToRteValue } from '@frontify/guideline-blocks-shared';
import { captionPlugins, titlePlugins } from '../../helper/plugins';
import { Asset } from '@frontify/app-bridge';
import { DesignTokens, TextStyles } from '@frontify/fondue';
import { useMemo } from 'react';

type RichTextEditorsProps = {
    designTokens: DesignTokens;
    isEditing: boolean;
    updateItemWith: (type: keyof Thumbnail, value: string | Asset[], id?: string) => void;
    id?: string;
    title?: string;
    description?: string;
};

export const RichTextEditors = ({
    designTokens,
    isEditing,
    updateItemWith,
    id,
    title,
    description,
}: RichTextEditorsProps) => {
    const memoizedTitle = useMemo(
        () => (
            <div className="[&>div>div>*]:!tw-mt-0">
                <RichTextEditor
                    id={`${id}-title`}
                    designTokens={designTokens}
                    isEditing={isEditing}
                    onBlur={(value) => updateItemWith('title', value, id)}
                    value={title ?? convertToRteValue(TextStyles.ELEMENT_HEADING3)}
                    placeholder="Add a title"
                    plugins={titlePlugins}
                    updateValueOnChange={!id} // only used for placeholder items
                />
            </div>
        ),
        [id, title, designTokens, isEditing, updateItemWith]
    );
    const memoizedDescription = useMemo(
        () => (
            <RichTextEditor
                id={`${id}-description`}
                designTokens={designTokens}
                isEditing={isEditing}
                value={description ?? convertToRteValue()}
                plugins={captionPlugins}
                onBlur={(value) => updateItemWith('description', value, id)}
                placeholder="Add a description"
                updateValueOnChange={!id}
            />
        ),
        [id, description, designTokens, isEditing, updateItemWith]
    );

    return (
        <div className="tw-w-full" style={{ wordBreak: 'break-word' }} data-test-id="thumbnail-rte">
            {memoizedTitle}
            {memoizedDescription}
        </div>
    );
};
