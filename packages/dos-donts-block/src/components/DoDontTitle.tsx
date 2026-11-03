/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles } from '@frontify/guideline-blocks-settings';
import { useCallback, useEffect, useRef } from 'react';

import { DoDontType, type DoDontTitleProps } from '../types';

const DoDontTitle = ({ id, type, title, editing, headingColor, onChangeItem }: DoDontTitleProps) => {
    // Starting a drag or leaving edit mode remounts the title without a blur, so an unsaved draft is also saved on unmount.
    const unsavedTitleRef = useRef<string | null>(null);
    const saveDraft = useCallback(() => {
        if (unsavedTitleRef.current !== null) {
            onChangeItem(id, { title: unsavedTitleRef.current });
            unsavedTitleRef.current = null;
        }
    }, [id, onChangeItem]);

    useEffect(() => saveDraft, [saveDraft]);

    const typeLabel = type === DoDontType.Do ? 'Do' : "Don't";

    const styles = {
        ...BlockStyles.heading3,
        marginBottom: 0,
        marginTop: 0,
        color: headingColor,
        WebkitTextFillColor: headingColor,
        '--placeholder-color': headingColor,
    };

    if (editing) {
        return (
            <textarea
                key={title}
                rows={1}
                defaultValue={title}
                onChange={(event) => {
                    unsavedTitleRef.current = event.target.value === title ? null : event.target.value;
                }}
                onBlur={saveDraft}
                style={styles}
                aria-label={`Title of ${typeLabel.toLocaleLowerCase()} item `}
                placeholder="Add a title"
                className="tw-text-small tw-w-full [field-sizing:content] tw-overflow-hidden tw-placeholder-[var(--placeholder-color)] placeholder:tw-opacity-70 tw-bg-transparent tw-resize-none tw-text-secondary tw-break-words tw-outline-none tw-whitespace-pre-wrap"
            />
        );
    }

    if (!title) {
        return <span className="tw-sr-only">{typeLabel}: </span>;
    }

    return (
        <h3 data-test-id="do-dont-heading" style={styles} className="tw-w-full tw-break-words tw-whitespace-pre-wrap">
            <span className="tw-sr-only">{typeLabel}: </span>
            {title}
        </h3>
    );
};

export default DoDontTitle;
