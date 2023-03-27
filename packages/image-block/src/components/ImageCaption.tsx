/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, TextStyles, parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import { convertToRteValue, hasRichTextValue, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
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

    const rawName = JSON.stringify(parseRawValue({ raw: name ?? '' }));
    const nameHtml = serializeRawToHtml(rawName, designTokens);
    const rawDescription = JSON.stringify(parseRawValue({ raw: description ?? '' }));
    const descriptionHtml = serializeRawToHtml(rawDescription, designTokens);

    return (
        <div className="tw-mt-3 tw-gap-1 tw-flex-1 tw-w-full">
            {isEditing ? (
                <>
                    <RichTextEditor
                        id={`${blockId}_title`}
                        value={name ?? convertToRteValue(TextStyles.ELEMENT_IMAGE_TITLE, '', 'center')}
                        border={false}
                        onBlur={onNameChange}
                        plugins={titlePlugins}
                        designTokens={designTokens}
                        placeholder="Asset name"
                        updateValueOnChange
                    />
                    <RichTextEditor
                        id={`${blockId}_description`}
                        value={description ?? convertToRteValue(TextStyles.ELEMENT_IMAGE_CAPTION, '', 'center')}
                        border={false}
                        onTextChange={onDescriptionChange}
                        onBlur={onDescriptionChange}
                        plugins={captionPlugins}
                        designTokens={designTokens}
                        placeholder="Add a description here"
                    />
                </>
            ) : (
                <>
                    {hasRichTextValue(name) && <div dangerouslySetInnerHTML={{ __html: nameHtml }} />}
                    {hasRichTextValue(description) && <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />}
                </>
            )}
        </div>
    );
};
