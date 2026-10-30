/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles } from '@frontify/guideline-blocks-settings';
import { useState } from 'react';

import { DoDontType, type DoDontTitleProps } from '../types';

const DoDontTitle = ({ id, type, title, editing, headingColor, onChangeItem }: DoDontTitleProps) => {
    const [draftTitle, setDraftTitle] = useState(title);
    const [syncedTitle, setSyncedTitle] = useState(title);

    if (title !== syncedTitle) {
        setSyncedTitle(title);
        setDraftTitle(title);
    }

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
                rows={1}
                onChange={(event) => setDraftTitle(event.target.value)}
                onBlur={() => {
                    if (draftTitle !== title) {
                        onChangeItem(id, { title: draftTitle });
                    }
                }}
                style={styles}
                value={draftTitle}
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
