/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { useMemo } from 'react';

import { getTitlePlugin } from '../helpers';
import { type CardTextProps } from '../types';

export const CardText = ({
    appBridge,
    title,
    description,
    hasBorder,
    isEditing,
    setTitle,
    setDescription,
}: CardTextProps) => {
    const titlePlugins = useMemo(() => getTitlePlugin(), []);
    const descriptionPlugins = useMemo(() => getDefaultPluginsWithLinkChooser(appBridge), [appBridge]);

    const memoTitleRte = useMemo(() => {
        return (
            <RichTextEditor
                value={title || convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={setTitle}
                isEditing={isEditing}
                plugins={titlePlugins}
            />
        );
    }, [title, isEditing, setTitle, titlePlugins]);

    const memoDescriptionRte = useMemo(() => {
        return (
            <RichTextEditor
                value={description || convertToRteValue()}
                placeholder="Add a description"
                onTextChange={setDescription}
                isEditing={isEditing}
                plugins={descriptionPlugins}
            />
        );
    }, [description, isEditing, setDescription, descriptionPlugins]);
    return (
        <div className={joinClassNames([hasBorder && 'tw-px-4', 'tw-pt-4 tw-flex-1'])}>
            {memoTitleRte}
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
