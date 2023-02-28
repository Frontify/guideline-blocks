/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { DEFAULT_CONTENT_DESCRIPTION, DEFAULT_CONTENT_NAME, captionPlugins, titlePlugins } from './helpers';

type ImageCaptionProps = {
    name?: string;
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
    onDescriptionChange,
}: ImageCaptionProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const rawName = JSON.stringify(parseRawValue({ raw: name ?? '' }));
    const nameHtml = serializeRawToHtml(rawName, designTokens);
    const rawDescription = JSON.stringify(parseRawValue({ raw: description ?? '' }));
    const descriptionHtml = serializeRawToHtml(rawDescription, designTokens);

    console.log('descriptionHtml', description);

    return (
        <div className="tw-mt-3 tw-gap-1 tw-flex-1 tw-w-full">
            {isEditing ? (
                <>
                    <RichTextEditor
                        value={name ?? DEFAULT_CONTENT_NAME}
                        border={false}
                        readonly={!isEditing}
                        onBlur={onNameChange}
                        onTextChange={onNameChange}
                        plugins={titlePlugins}
                        designTokens={designTokens ?? undefined}
                        placeholder={isEditing ? 'Asset name' : undefined}
                    />
                    <RichTextEditor
                        value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                        border={false}
                        readonly={!isEditing}
                        onTextChange={onDescriptionChange}
                        onBlur={onDescriptionChange}
                        plugins={captionPlugins}
                        designTokens={designTokens}
                        placeholder={isEditing ? 'Add a description here' : undefined}
                    />
                </>
            ) : (
                <>
                    <div dangerouslySetInnerHTML={{ __html: nameHtml }} />
                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                </>
            )}
        </div>
    );
};
