/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, parseRawValue, serializeRawToHtml, toPlaintext } from '@frontify/fondue';
import { useMemo } from 'react';
import { labelPlugins } from '../../helpers';
import { LabelProps } from '../../types';

export const Label = ({ designTokens, onBlur, value, isEditing }: LabelProps) => {
    const rawValue = useMemo(() => JSON.stringify(parseRawValue({ raw: value ?? '' })), [value]);
    const valueHtml = useMemo(() => serializeRawToHtml(rawValue, designTokens), [rawValue, designTokens]);
    const isEditorEmpty = !toPlaintext(rawValue);
    const richTextEditor = useMemo(() => {
        return (
            <RichTextEditor
                value={value}
                onBlur={onBlur}
                border={false}
                designTokens={designTokens}
                plugins={labelPlugins}
                placeholder="Label content"
            />
        );
    }, [value, onBlur, designTokens]);
    return isEditorEmpty && !isEditing ? (
        <div />
    ) : (
        <div
            data-test-id="compare-slider-block-label-wrapper"
            className="tw-max-w-full tw-p-2 tw-bg-white/80 tw-rounded-sm tw-text-black tw-text-sm tw-select-text"
        >
            {isEditing ? richTextEditor : <div dangerouslySetInnerHTML={{ __html: valueHtml }} />}
        </div>
    );
};
