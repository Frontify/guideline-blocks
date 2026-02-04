/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import {
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { type ReactElement } from 'react';

import { getCaptionPlugins } from '../helpers/plugins';

interface Props {
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    title?: string;
    onTitleChange: (newValue: string) => void;
    description?: string;
    onDescriptionChange: (newValue: string) => void;
}

export const Captions = ({
    appBridge,
    description,
    isEditing,
    onDescriptionChange,
    onTitleChange,
    title,
}: Props): ReactElement => {
    const commonProps = {
        isEditing,
        plugins: getCaptionPlugins(appBridge),
    };

    return (
        <div className={joinClassNames(['tw-flex tw-flex-col tw-gap-1 tw-w-full'])}>
            <RichTextEditor
                id={`${String(appBridge.context('blockId').get())}_title`}
                value={title ?? convertToRteValue(TextStyles.imageTitle, '')}
                onTextChange={onTitleChange}
                showSerializedText={hasRichTextValue(title)}
                placeholder="Pattern name"
                {...commonProps}
            />
            <RichTextEditor
                id={`${String(appBridge.context('blockId').get())}_description`}
                value={description ?? convertToRteValue(TextStyles.imageCaption, '')}
                onTextChange={onDescriptionChange}
                showSerializedText={hasRichTextValue(description)}
                placeholder="Add a description here"
                {...commonProps}
            />
        </div>
    );
};
