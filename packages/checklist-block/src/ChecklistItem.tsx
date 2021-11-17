import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { ButtonGroup, ButtonSize } from '@frontify/arcade';
import MockTextEditor from './MockTextEditor';
import { useHover } from '@react-aria/interactions/src/useHover';
import { ChecklistDecoration, ChecklistItemProps } from './types';
import { Checkbox } from './Checkbox';

export default function ChecklistItem({
    id,
    text,
    completed,
    toggleCompleted,
    checkboxDisabled,
    dateCompleted,
    readonly,
    controlButtons,
    strikethroughStyle,
    highlightColor,
    completedDecoration,
    completeStyle,
    incompleteStyle,
    dateVisible,
    onChange,
    onBlur,
}: ChecklistItemProps): ReactElement {
    let { hoverProps, isHovered } = useHover({});
    let decorationStyle;

    switch (completedDecoration) {
        case ChecklistDecoration.Highlight:
            decorationStyle = {
                backgroundColor: highlightColor,
            };
            break;
        case ChecklistDecoration.Strikethrough:
            decorationStyle = {
                textDecorationLine: 'line-through',
                textDecorationThickness: strikethroughStyle?.width,
                textDecorationColor: strikethroughStyle?.color,
                textDecorationStyle: strikethroughStyle?.style,
            };
            break;
        default:
            break;
    }

    return (
        <div className={`tw-flex tw-cursor-pointer ${isHovered ? 'tw-bg-black-5' : 'tw-bg-white'}`} {...hoverProps}>
            <Checkbox
                checked={completed}
                onChange={toggleCompleted}
                id={id}
                ariaLabel={text}
                disabled={checkboxDisabled}
                checkedColor={completeStyle?.checkbox}
                uncheckedColor={incompleteStyle?.checkbox}
            />
            <div className="tw-flex-auto">
                {completed ? (
                    <span>
                        <p style={{ color: completeStyle.color, ...decorationStyle }}>{text}</p>
                        {dateVisible && <small style={{ color: completeStyle.color }}>{dateCompleted}</small>}
                    </span>
                ) : (
                    <MockTextEditor
                        color={incompleteStyle.color}
                        readonly={readonly}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={text}
                        placeholder="Add new checklist item"
                    />
                )}
            </div>
            <div className={`tw-flex-none tw-flex ${isHovered ? 'tw-visible' : 'tw-invisible'}`}>
                <ButtonGroup size={ButtonSize.Small}>{controlButtons}</ButtonGroup>
            </div>
        </div>
    );
}
