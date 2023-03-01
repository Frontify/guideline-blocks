/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor } from '@frontify/fondue';
import { hasRichTextValue, joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

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

    return (
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-mt-3 tw-gap-1">
            <div
                className={joinClassNames([
                    'tw-text-text tw-text-[12px] tw-leading-[18px] tw-font-medium',
                    hasRichTextValue(name) || isEditing ? 'tw-block' : 'tw-hidden',
                ])}
            >
                <RichTextEditor
                    value={name}
                    border={false}
                    readonly={!isEditing}
                    onBlur={onNameChange}
                    onTextChange={onNameChange}
                    designTokens={designTokens}
                    placeholder={isEditing ? 'Asset name' : undefined}
                />
            </div>
            <div
                className={joinClassNames([
                    'tw-text-text-weak tw-text-[11px] tw-leading-[13px]',
                    hasRichTextValue(description) || isEditing ? 'tw-block' : 'tw-hidden',
                ])}
            >
                <RichTextEditor
                    value={description}
                    border={false}
                    readonly={!isEditing}
                    onTextChange={onDescriptionChange}
                    onBlur={onDescriptionChange}
                    designTokens={designTokens}
                    placeholder={isEditing ? 'Add a description here' : undefined}
                />
            </div>
        </div>
    );
};
