import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { IconCaretDown, IconCaretUp, IconReject, RichTextEditor } from '@frontify/arcade';

export default function ChecklistItem({
    text,
    createdAt,
    updatedAt,
    status,
    textColor,
    checkboxColor,
    isEditing,
}): ReactElement {
    const textDecoration = status === 'complete' ? 'tw-line-through' : '';
    return (
        <div className="tw-flex">
            <div className="flex-auto">
                <RichTextEditor readonly={isEditing} />
            </div>
            <div className="flex-none">
                <IconCaretUp />
                <IconCaretDown />
                <IconReject />
            </div>
        </div>
    );
}
