/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonGroup, ButtonSize, IconCaretDown, IconCaretUp, IconCross, ItemDragState } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { getInteractionModality, useFocusWithin, useHover } from '@react-aria/interactions';
import { FC, useState } from 'react';
import { ChecklistItemMode, ChecklistItemProps } from '../types';
import { Checkbox } from './Checkbox';
import { ChecklistButton } from './ChecklistButton';
import { FocusController } from './FocusController';
import { TextEditor } from './TextEditor';

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
    designTokens,
}) => {
    const [focused, setFocused] = useState(false);

    const interaction = getInteractionModality();

    const { hoverProps, isHovered } = useHover({});
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: (focused) => setFocused(focused && interaction === 'keyboard'),
    });

    const shouldDisplayControlPanel =
        (isHovered || focused || isDragFocusVisible) &&
        mode === ChecklistItemMode.Edit &&
        dragState === ItemDragState.Idle;

    const { completed, updatedAt, id, text } = item || DefaultChecklistItem;

    const containerClasses = joinClassNames([
        'tw-relative tw-rounded tw-p-1',
        dragState === ItemDragState.Preview && 'tw-bg-white',
        dragState === ItemDragState.Dragging && 'tw-bg-black-5 tw-opacity-70',
        shouldDisplayControlPanel && 'tw-bg-black-5',
    ]);

    const notEditable = mode !== ChecklistItemMode.Edit;

    const textEditor = (
        <TextEditor
            resetOnSave={mode === ChecklistItemMode.Create}
            readonly={mode === ChecklistItemMode.View}
            onTextModified={onTextModified}
            value={text}
            placeholder="Add new checklist item"
        />
    );

    const accessibleEditor =
        mode === ChecklistItemMode.Create ? textEditor : <FocusController>{textEditor}</FocusController>;

    return (
        <div
            className={containerClasses}
            {...hoverProps}
            {...focusWithinProps}
            data-test-id="checklist-item"
            data-mode={mode}
            data-key={id}
        >
            <div className="tw-flex tw-flex-auto tw-content-center tw-p-2">
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
                            designTokens={designTokens}
                        />
                        {!completed && accessibleEditor}
                    </div>
                </div>
            </div>
            {mode !== ChecklistItemMode.Create && (
                <div
                    className={joinClassNames([
                        'tw-absolute tw-top-3 tw-right-3',
                        shouldDisplayControlPanel ? 'tw-opacity-1' : 'tw-opacity-0 tw-pointer-events-none',
                    ])}
                    data-test-id="control-buttons"
                >
                    <ButtonGroup size={ButtonSize.Small}>
                        <ChecklistButton
                            disabled={isFirst || notEditable}
                            icon={<IconCaretUp />}
                            onClick={() => onMoveItem && onMoveItem(id, -1)}
                        />
                        <ChecklistButton
                            disabled={isLast || notEditable}
                            icon={<IconCaretDown />}
                            onClick={() => onMoveItem && onMoveItem(id, 1)}
                        />
                        <ChecklistButton
                            disabled={notEditable}
                            icon={<IconCross />}
                            onClick={() => onRemoveItem && onRemoveItem(id)}
                        />
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
