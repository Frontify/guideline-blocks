/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { RichTextEditor, TextStyles, convertToRteValue } from '@frontify/guideline-blocks-settings';
import { memo, useMemo } from 'react';

import { getCaptionPlugins, titlePlugins } from '../../helper/plugins';
import { type Thumbnail } from '../../types';

type RichTextEditorsProps = {
    isEditing: boolean;
    updateItem: (key: keyof Thumbnail, value: string) => void;
    title?: string;
    description?: string;
    appBridge: AppBridgeBlock;
};

export const RichTextEditors = memo((props: RichTextEditorsProps) => {
    const { isEditing, updateItem, title, description, appBridge } = props;

    const memoizedTitle = useMemo(
        () => (
            <div className="[&>div>div>*]:!tw-mt-0">
                <RichTextEditor
                    isEditing={isEditing}
                    onTextChange={(value) => updateItem('title', value)}
                    value={title ?? convertToRteValue(TextStyles.heading3)}
                    placeholder="Add a title"
                    plugins={titlePlugins}
                />
            </div>
        ),
        [title, isEditing, updateItem]
    );
    const memoizedDescription = useMemo(
        () => (
            <RichTextEditor
                isEditing={isEditing}
                value={description ?? convertToRteValue()}
                plugins={getCaptionPlugins(appBridge)}
                onTextChange={(value) => updateItem('description', value)}
                placeholder="Add a description"
            />
        ),
        [description, isEditing, updateItem, appBridge]
    );

    return (
        <div className="tw-w-full" data-test-id="thumbnail-rte">
            {memoizedTitle}
            {memoizedDescription}
        </div>
    );
});

RichTextEditors.displayName = 'RichTextEditors';
