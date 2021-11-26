import { ReactElement, useState } from 'react';
import { ButtonGroup, ButtonSize, DragState, IconCaretUp, IconCaretDown, IconSize, IconReject } from '@frontify/arcade';
import MockTextEditor from './MockTextEditor';
import { useHover } from '@react-aria/interactions';
import { useFocusWithin } from '@react-aria/interactions';
import { Checkbox } from './Checkbox';
import { merge } from '../utilities/merge';
import ChecklistButton from './ChecklistButton';
import { ChecklistItemMode } from '../types';

export type ChecklistItemProps = {
    id: string;
    text: string;
    checked: boolean;
    toggleCompleted?: (value: boolean) => void;
    isDragFocusVisible?: boolean;
    dateCompleted?: number;
    dragState?: DragState;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    mode: ChecklistItemMode;
    isFirst?: boolean;
    isLast?: boolean;
    onMoveItem?: (id: string, num: number) => void;
    onRemoveItem?: (id: string) => void;
};

export default function ChecklistItem({
    id,
    text,
    checked,
    toggleCompleted,
    dateCompleted,
    isDragFocusVisible,
    isFirst,
    isLast,
    onChange,
    mode,
    onMoveItem,
    onRemoveItem,
    dragState,
}: ChecklistItemProps): ReactElement {
    const [focused, setFocused] = useState(false);

    const { hoverProps, isHovered } = useHover({});
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: setFocused,
    });

    const shouldDisplayControlPanel = () => {
        return (
            (isHovered || focused || isDragFocusVisible) &&
            mode === ChecklistItemMode.Edit &&
            dragState === DragState.Idle
        );
    };

    return (
        <div
            className={merge([
                'tw-flex tw-content-center ',
                shouldDisplayControlPanel() && 'tw-bg-black-5',
                (dragState === DragState.Preview || !shouldDisplayControlPanel) && 'tw-bg-white',
                dragState === DragState.Dragging && 'tw-opacity-70 tw-bg-black-5',
            ])}
            {...hoverProps}
            {...focusWithinProps}
        >
            <div className="tw-p-1.5 tw-flex tw-flex-auto tw-content-center">
                <div className="tw-flex tw-items-center tw-transition-colors tw-flex-auto tw-gap-2">
                    <div className="tw-flex tw-gap-2 tw-flex-auto">
                        <Checkbox
                            checked={checked}
                            onChange={toggleCompleted}
                            id={id}
                            ariaLabel={text}
                            disabled={mode === ChecklistItemMode.Create}
                            showLabel={checked}
                            label={text}
                            dateCompleted={dateCompleted}
                        />
                        {!checked && (
                            <MockTextEditor
                                resetOnChange={mode === ChecklistItemMode.Create}
                                readonly={mode === ChecklistItemMode.View}
                                onChange={onChange}
                                value={text}
                                placeholder="Add new checklist item"
                            />
                        )}
                    </div>
                </div>
            </div>
            {mode !== ChecklistItemMode.Create && (
                <div
                    className={`tw-flex-none tw-flex tw-items-center ${
                        shouldDisplayControlPanel() ? 'tw-visible' : 'tw-invisible tw-pointer-events-none'
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
}
