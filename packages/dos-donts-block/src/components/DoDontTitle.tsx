/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles } from '@frontify/guideline-blocks-settings';

import { type DoDontTitleProps } from '../types';

const DoDontTitle = ({ id, title, editing, headingColor, onChangeItem, onChangeLocalItem }: DoDontTitleProps) => {
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
                onChange={(event) => onChangeLocalItem(id, event.target.value, 'title')}
                onBlur={() => onChangeItem(id, { title })}
                style={styles}
                value={title}
                aria-label="Title"
                placeholder="Add a title"
                className="tw-text-small tw-w-full tw-[field-sizing:content] tw-placeholder-[var(--placeholder-color)] placeholder:tw-opacity-70 tw-bg-transparent tw-resize-none tw-text-secondary tw-break-words tw-outline-none tw-whitespace-pre-wrap"
            />
        );
    }

    return (
        <h3 data-test-id="do-dont-heading" style={styles} className="tw-w-full tw-break-words tw-whitespace-pre-wrap">
            {title}
        </h3>
    );
};

export default DoDontTitle;
