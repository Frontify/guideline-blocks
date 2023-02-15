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
const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"image-title","children":[{"text":""}]}]'; // TODO adapt in Fondue the textstyles, such that image-title can be used here (https://app.clickup.com/t/8677a21bv)
const DEFAULT_CONTENT_NAME = '[{"type":"imageCaption","children":[{"text":""}]}]'; // TODO adapt in Fondue the textstyles, such that imageCaption can be used here (https://app.clickup.com/t/8677a21bv)

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
                    value={name ?? DEFAULT_CONTENT_NAME}
                    border={false}
                    readonly={!isEditing}
                    onBlur={onNameChange}
                    onTextChange={onNameChange}
                    designTokens={designTokens ?? undefined}
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
                    value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                    border={false}
                    readonly={!isEditing}
                    onTextChange={onDescriptionChange}
                    onBlur={onDescriptionChange}
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Add a description here' : undefined}
                />
            </div>
        </div>
    );
};
