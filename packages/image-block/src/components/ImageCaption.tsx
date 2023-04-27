/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyles } from '@frontify/fondue';
import {
    RichTextEditor,
    convertToRteValue,
    hasRichTextValue,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import { captionPlugins, titlePlugins } from './helpers';

type ImageCaptionProps = {
    name?: string;
    blockId: string;
    isEditing: boolean;
    description?: string;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
};

export const ImageCaption = ({
    name,
    description,
    isEditing,
    onNameChange,
    blockId,
    onDescriptionChange,
}: ImageCaptionProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div className="tw-mt-3 tw-gap-1 tw-flex-1 tw-w-full" data-test-id="image-caption">
            <RichTextEditor
                id={`${blockId}_title`}
                isEditing={isEditing}
                designTokens={designTokens}
                plugins={titlePlugins}
                onBlur={onNameChange}
                placeholder="Asset name"
                showSerializedText={hasRichTextValue(name)}
                value={name ?? convertToRteValue(TextStyles.ELEMENT_IMAGE_TITLE, '', 'center')}
                updateValueOnChange
            />
            <RichTextEditor
                id={`${blockId}_description`}
                isEditing={isEditing}
                designTokens={designTokens}
                plugins={captionPlugins}
                onBlur={onDescriptionChange}
                placeholder="Add a description here"
                showSerializedText={hasRichTextValue(description)}
                value={description ?? convertToRteValue(TextStyles.ELEMENT_IMAGE_CAPTION, '', 'center')}
            />
        </div>
    );
};
