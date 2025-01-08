/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import {
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';

import { CardTextProps } from '../types';
import { getTitlePlugin } from '../helpers';

export const CardText = ({
    id,
    appBridge,
    title,
    description,
    hasBorder,
    isEditing,
    setTitle,
    setDescription,
}: CardTextProps) => {
    const blockId = appBridge.context('blockId').get();
    const memoTitleRte = useMemo(() => {
        return (
            <RichTextEditor
                id={`${id}-title-${blockId}`}
                value={title || convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={setTitle}
                isEditing={isEditing}
                plugins={getTitlePlugin()}
            />
        );
    }, [title, isEditing, setTitle, id, blockId]);

    const memoDescriptionRte = useMemo(() => {
        return (
            <RichTextEditor
                id={`${id}-description-${blockId}`}
                value={description || convertToRteValue()}
                placeholder="Add a description"
                onTextChange={setDescription}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        );
    }, [description, isEditing, setDescription, appBridge, blockId, id]);
    return (
        <div className={joinClassNames([hasBorder && 'tw-px-4', 'tw-pt-4 tw-flex-1'])}>
            {memoTitleRte}
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
