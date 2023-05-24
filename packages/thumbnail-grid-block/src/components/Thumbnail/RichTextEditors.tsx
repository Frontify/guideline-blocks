/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Thumbnail } from '../../types';
import { RichTextEditor, convertToRteValue } from '@frontify/guideline-blocks-shared';
import { captionPlugins, titlePlugins } from '../../helper/plugins';
import { Asset } from '@frontify/app-bridge';
import { TextStyles } from '@frontify/fondue';
import { useMemo } from 'react';

type RichTextEditorsProps = {
    isEditing: boolean;
    updateItemWith: (type: keyof Thumbnail, value: string | Asset[], id?: string) => void;
    id?: string;
    title?: string;
    description?: string;
};

export const RichTextEditors = ({ isEditing, updateItemWith, id, title, description }: RichTextEditorsProps) => {
    const memoizedTitle = useMemo(
        () => (
            <div className="[&>div>div>*]:!tw-mt-0">
                <RichTextEditor
                    id={`${id}-title`}
                    isEditing={isEditing}
                    onBlur={(value) => updateItemWith('title', value, id)}
                    value={title ?? convertToRteValue(TextStyles.heading3)}
                    placeholder="Add a title"
                    plugins={titlePlugins}
                    updateValueOnChange={!id} // only used for placeholder items
                />
            </div>
        ),
        [id, title, isEditing, updateItemWith]
    );
    const memoizedDescription = useMemo(
        () => (
            <RichTextEditor
                id={`${id}-description`}
                isEditing={isEditing}
                value={description ?? convertToRteValue()}
                plugins={captionPlugins}
                onBlur={(value) => updateItemWith('description', value, id)}
                placeholder="Add a description"
                updateValueOnChange={!id}
            />
        ),
        [id, description, isEditing, updateItemWith]
    );

    return (
        <div className="tw-w-full" style={{ wordBreak: 'break-word' }} data-test-id="thumbnail-rte">
            {memoizedTitle}
            {memoizedDescription}
        </div>
    );
};
