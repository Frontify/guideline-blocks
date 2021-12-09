/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, FC } from 'react';
import {
    ButtonGroup,
    ButtonSize,
    ItemDragState,
    IconCaretUp,
    IconCaretDown,
    IconSize,
    IconReject,
    FocusController,
} from '@frontify/arcade';
import { TextEditor } from './TextEditor';
import { useHover } from '@react-aria/interactions';
import { useFocusWithin } from '@react-aria/interactions';
import { Checkbox } from './Checkbox';
import { ChecklistButton } from './ChecklistButton';
import { ChecklistItemMode, ChecklistItemProps } from '../types';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

const DefaultChecklistItem = {
    text: '',
    id: '',
    createdAt: 0,
    updatedAt: 0,
    completed: false,
};

export const ChecklistItem: FC<ChecklistItemProps> = ({
    item,
    toggleCompleted,
    isDragFocusVisible,
    isFirst,
    isLast,
    onTextModified,
    mode,
    onMoveItem,
    onRemoveItem,
    dragState,
}) => {
    const [focused, setFocused] = useState(false);

    const { hoverProps, isHovered } = useHover({});
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: setFocused,
    });

    const shouldDisplayControlPanel =
        (isHovered || focused || isDragFocusVisible) &&
        mode === ChecklistItemMode.Edit &&
        dragState === ItemDragState.Idle;

    const { completed, updatedAt, id, text } = item || DefaultChecklistItem;

    const containerClasses = joinClassNames([
        'tw-flex tw-content-center',
        dragState === ItemDragState.Preview && 'tw-bg-white',
        dragState === ItemDragState.Dragging && 'tw-bg-black-5 tw-opacity-70',
        shouldDisplayControlPanel && 'tw-bg-black-5',
    ]);

    const notEditable = mode !== ChecklistItemMode.Edit;

    return (
        <div
            className={containerClasses}
            {...hoverProps}
            {...focusWithinProps}
            data-test-id="checklist-item"
            data-mode={mode}
        >
            <div className="tw-p-2 tw-flex tw-flex-auto tw-content-center">
                <div className="tw-flex tw-flex-auto tw-items-center">
                    <div className="tw-flex tw-flex-auto tw-items-start">
                        <Checkbox
                            checked={completed}
                            onChange={toggleCompleted}
                            id={id}
                            ariaLabel={text}
                            disabled={mode !== ChecklistItemMode.Edit}
                            showLabel={completed}
                            label={text}
                            dateCompleted={updatedAt}
                        />
                        {!completed && (
                            <FocusController>
                                <TextEditor
                                    resetOnSave={mode === ChecklistItemMode.Create}
                                    readonly={mode === ChecklistItemMode.View}
                                    onTextModified={onTextModified}
                                    value={text}
                                    placeholder="Add new checklist item"
                                />
                            </FocusController>
                        )}
                    </div>
                </div>
            </div>
            {mode !== ChecklistItemMode.Create && (
                <div
                    className={joinClassNames([
                        'tw-flex-none tw-flex tw-items-center',
                        shouldDisplayControlPanel ? 'tw-opacity-1' : 'tw-opacity-0 tw-pointer-events-none',
                    ])}
                    data-test-id="control-buttons"
                >
                    <ButtonGroup size={ButtonSize.Small}>
                        <ChecklistButton
                            disabled={isFirst || notEditable}
                            icon={<IconCaretUp size={IconSize.Size16} />}
                            onClick={() => onMoveItem && onMoveItem(id, -1)}
                        />
                        <ChecklistButton
                            disabled={isLast || notEditable}
                            icon={<IconCaretDown size={IconSize.Size16} />}
                            onClick={() => onMoveItem && onMoveItem(id, 1)}
                        />
                        <ChecklistButton
                            disabled={notEditable}
                            icon={<IconReject size={IconSize.Size16} />}
                            onClick={() => onRemoveItem && onRemoveItem(id)}
                        />
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
