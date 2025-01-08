/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Thumbnail } from '../../types';
import { RichTextEditor, TextStyles, convertToRteValue } from '@frontify/guideline-blocks-settings';
import { getCaptionPlugins, titlePlugins } from '../../helper/plugins';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { memo, useMemo } from 'react';

type RichTextEditorsProps = {
    isEditing: boolean;
    updateItem: (key: keyof Thumbnail, value: string) => void;
    id?: string;
    title?: string;
    description?: string;
    appBridge: AppBridgeBlock;
};

export const RichTextEditors = memo((props: RichTextEditorsProps) => {
    const { isEditing, updateItem, id, title, description, appBridge } = props;
    const blockId = appBridge.context('blockId').get();

    const memoizedTitle = useMemo(
        () => (
            <div className="[&>div>div>*]:!tw-mt-0">
                <RichTextEditor
                    id={`${id}-title-${blockId}`}
                    isEditing={isEditing}
                    onTextChange={(value) => updateItem('title', value)}
                    value={title ?? convertToRteValue(TextStyles.heading3)}
                    placeholder="Add a title"
                    plugins={titlePlugins}
                />
            </div>
        ),
        [id, title, isEditing, blockId, updateItem]
    );
    const memoizedDescription = useMemo(
        () => (
            <RichTextEditor
                id={`${id}-description-${blockId}`}
                isEditing={isEditing}
                value={description ?? convertToRteValue()}
                plugins={getCaptionPlugins(appBridge)}
                onTextChange={(value) => updateItem('description', value)}
                placeholder="Add a description"
            />
        ),
        [id, description, isEditing, blockId, updateItem, appBridge]
    );

    return (
        <div className="tw-w-full" style={{ wordBreak: 'break-word' }} data-test-id="thumbnail-rte">
            {memoizedTitle}
            {memoizedDescription}
        </div>
    );
});

RichTextEditors.displayName = 'RichTextEditors';
