/* (c) Copyright Frontify Ltd., all rights reserved. */
import { useState, FC } from 'react';
import { ButtonGroup, ButtonSize, DragState, IconCaretUp, IconCaretDown, IconSize, IconReject } from '@frontify/arcade';
import { TextEditor } from './TextEditor';
import { useHover } from '@react-aria/interactions';
import { useFocusWithin } from '@react-aria/interactions';
import { Checkbox } from './Checkbox';
import { ChecklistButton } from './ChecklistButton';
import { ChecklistItemMode, ChecklistItemProps, DefaultChecklistItem } from '../types';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { FocusController } from './FocusController';

export const ChecklistItem: FC<ChecklistItemProps> = ({
    item,
    toggleCompleted,
    isDragFocusVisible,
    isFirst,
    isLast,
    onChange,
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
        (isHovered || focused || isDragFocusVisible) && mode === ChecklistItemMode.Edit && dragState === DragState.Idle;

    const { completed, updatedAt, id, text } = item || DefaultChecklistItem;

    const containerClasses = ['tw-flex tw-content-center'];

    if (dragState === DragState.Preview) containerClasses.push('tw-bg-white');
    else if (dragState === DragState.Dragging) containerClasses.push('tw-bg-black-5 tw-opacity-70');
    else if (shouldDisplayControlPanel) containerClasses.push('tw-bg-black-5');

    return (
        <div className={joinClassNames(containerClasses)} {...hoverProps} {...focusWithinProps}>
            <div className="tw-p-1.5 tw-flex tw-flex-auto tw-content-center">
                <div className="tw-flex tw-items-center tw-flex-auto tw-gap-2">
                    <div className="tw-flex tw-gap-2 tw-flex-auto">
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
                                    resetOnChange={mode === ChecklistItemMode.Create}
                                    readonly={mode === ChecklistItemMode.View}
                                    onChange={onChange}
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
                    className={`tw-flex-none tw-flex tw-items-center ${
                        shouldDisplayControlPanel ? 'tw-opacity-1' : 'tw-opacity-0 tw-pointer-events-none'
                    }`}
                >
                    <ButtonGroup size={ButtonSize.Small}>
                        <ChecklistButton
                            disabled={isFirst}
                            icon={<IconCaretUp size={IconSize.Size16} />}
                            onClick={() => onMoveItem && onMoveItem(id, -1)}
                        />
                        <ChecklistButton
                            disabled={isLast}
                            icon={<IconCaretDown size={IconSize.Size16} />}
                            onClick={() => onMoveItem && onMoveItem(id, 1)}
                        />
                        <ChecklistButton
                            icon={<IconReject size={IconSize.Size16} />}
                            onClick={() => onRemoveItem && onRemoveItem(id)}
                        />
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
