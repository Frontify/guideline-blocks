/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import {
    RichTextEditor,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    joinClassNames,
} from '@frontify/guideline-blocks-shared';
import { TextStyles } from '@frontify/fondue';

import { CardTextProps } from '../types';
import { getTitlePlugin } from '../helpers';

export const CardText = ({
    appBridge,
    title,
    description,
    hasBorder,
    updateValueOnChange,
    isEditing,
    setTitle,
    setDescription,
}: CardTextProps) => {
    const memoTitleRte = useMemo(() => {
        return (
            <RichTextEditor
                value={title || convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={setTitle}
                isEditing={isEditing}
                updateValueOnChange={updateValueOnChange}
                plugins={getTitlePlugin()}
            />
        );
    }, [title, isEditing, updateValueOnChange, setTitle]);

    const memoDescriptionRte = useMemo(() => {
        return (
            <RichTextEditor
                value={description || convertToRteValue()}
                placeholder="Add a description"
                onTextChange={setDescription}
                isEditing={isEditing}
                updateValueOnChange={updateValueOnChange}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        );
    }, [description, isEditing, updateValueOnChange, setDescription, appBridge]);

    return (
        <div className={joinClassNames([hasBorder && 'tw-px-4', 'tw-pt-4 tw-flex-1'])}>
            {memoTitleRte}
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
