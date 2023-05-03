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
    designTokens,
    updateValueOnChange,
    isEditing,
    setTitle,
    setDescription,
}: CardTextProps) => {
    const memoTitleRte = useMemo(() => {
        return (
            <RichTextEditor
                value={title || convertToRteValue(TextStyles.ELEMENT_HEADING3)}
                placeholder="Add a title"
                onBlur={setTitle}
                designTokens={designTokens}
                isEditing={isEditing}
                updateValueOnChange={updateValueOnChange}
                plugins={getTitlePlugin()}
            />
        );
    }, [title, designTokens, isEditing, updateValueOnChange, setTitle]);

    const memoDescriptionRte = useMemo(() => {
        return (
            <RichTextEditor
                value={description || convertToRteValue(TextStyles.ELEMENT_PARAGRAPH)}
                placeholder="Add a description"
                onBlur={setDescription}
                designTokens={designTokens}
                isEditing={isEditing}
                updateValueOnChange={updateValueOnChange}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        );
    }, [description, designTokens, isEditing, updateValueOnChange, setDescription, appBridge]);

    return (
        <div className={joinClassNames([hasBorder && 'tw-px-4', 'tw-pt-4 tw-flex-1'])}>
            {memoTitleRte}
            <div className="tw-pb-3">{memoDescriptionRte}</div>
        </div>
    );
};
