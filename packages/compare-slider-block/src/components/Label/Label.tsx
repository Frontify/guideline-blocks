/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, hasRichTextValue } from '@frontify/guideline-blocks-shared';
import { labelPlugins } from '../../helpers';
import { LabelProps } from '../../types';

export const Label = ({ onBlur, value, isEditing, blockId }: LabelProps) => {
    const isEditorEmpty = !hasRichTextValue(value);

    return isEditorEmpty && !isEditing ? (
        <div />
    ) : (
        <div
            data-test-id="compare-slider-block-label-wrapper"
            className="tw-max-w-full tw-p-2 tw-bg-white/80 tw-rounded-sm tw-text-black tw-text-sm tw-select-text"
        >
            <RichTextEditor
                id={`${blockId}-title`}
                isEditing={isEditing}
                plugins={labelPlugins}
                onTextChange={onBlur}
                placeholder="Label content"
                value={value}
            />
        </div>
    );
};
