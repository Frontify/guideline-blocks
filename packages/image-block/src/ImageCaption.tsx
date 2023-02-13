/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

export const ImageCaption = ({
    name,
    description,
    isEditing,
    onNameChange,
    onDescriptionChange,
}: {
    name?: string;
    isEditing: boolean;
    description?: string;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
}) => {
    return (
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-mt-3 tw-gap-1">
            <div
                className={joinClassNames([
                    name ? 'tw-text-text tw-text-[12px] tw-leading-[18px] tw-font-medium' : 'tw-text-blank-state-weak',
                ])}
            >
                <RichTextEditor
                    value={name}
                    border={false}
                    readonly={!isEditing}
                    onBlur={onNameChange}
                    onTextChange={onNameChange}
                    placeholder={isEditing ? 'Asset name' : undefined}
                />
            </div>
            <div
                className={joinClassNames([
                    description ? 'tw-text-text-weak tw-text-[11px] tw-leading-[13px]' : 'tw-text-blank-state-weak',
                ])}
            >
                <RichTextEditor
                    value={description}
                    border={false}
                    readonly={!isEditing}
                    onTextChange={onDescriptionChange}
                    onBlur={onDescriptionChange}
                    placeholder={isEditing ? 'Add a description here' : undefined}
                />
            </div>
        </div>
    );
};
