import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { ButtonGroup, ButtonSize } from '@frontify/arcade';
import MockTextEditor from './MockTextEditor';
import { useHover } from '@react-aria/interactions/src/useHover';
import { ChecklistDecoration, ChecklistItemProps } from './types';
import { Checkbox } from './Checkbox';
import { merge } from './utilities/merge';

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
        <div
            className={merge([
                'tw-flex',
                isHovered && !checkboxDisabled && !readonly && 'tw-bg-black-5 tw-cursor-pointer',
                (!isHovered || readonly || checkboxDisabled) && 'tw-bg-white',
            ])}
            {...hoverProps}
        >
            <div className="tw-p-1 tw-flex tw-flex-auto">
                <Checkbox
                    checked={completed}
                    onChange={toggleCompleted}
                    id={id}
                    ariaLabel={text}
                    disabled={checkboxDisabled}
                    checkedColor={completeStyle?.checkbox}
                    uncheckedColor={incompleteStyle?.checkbox}
                />
                <div className="tw-flex-auto tw-pl-2">
                    {completed ? (
                        <div>
                            <p>
                                <span className="tw-px-1" style={{ color: completeStyle.color, ...decorationStyle }}>
                                    {text}
                                </span>
                            </p>
                            {dateVisible && <small className="tw-black-80">{dateCompleted}</small>}
                        </div>
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
            </div>
            <div className={`tw-flex-none tw-flex ${isHovered && !readonly ? 'tw-visible' : 'tw-invisible'}`}>
                <ButtonGroup size={ButtonSize.Small}>{controlButtons}</ButtonGroup>
            </div>
        </div>
    );
}
