import { ReactElement, useState } from 'react';
import { ButtonGroup, ButtonSize } from '@frontify/arcade';
import MockTextEditor from './MockTextEditor';
import { useHover } from '@react-aria/interactions';
import { useFocusWithin } from '@react-aria/interactions';
import { Checkbox } from './Checkbox';
import { merge } from '../utilities/merge';
import dayjs from '../utilities/day';
import { CheckboxLabel } from './CheckboxLabel';
import { DecorationStyle, ToggleableStyle } from '../types';

export type ChecklistItemProps = {
    id: string;
    text: string;
    createdAt?: string;
    updatedAt?: string;
    checked: boolean;
    checkboxDisabled: boolean;
    toggleCompleted?: (value: boolean) => void;
    dateCompleted?: number;
    dateVisible: boolean;
    readonly: boolean;
    controlButtons?: ReactElement;
    decorationStyle?: DecorationStyle;
    checkboxStyle: ToggleableStyle;
    labelStyle: ToggleableStyle;
    isBeingDragged?: boolean;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    resetOnChange: boolean;
};

export default function ChecklistItem({
    id,
    text,
    checked,
    toggleCompleted,
    checkboxDisabled,
    dateCompleted,
    readonly,
    controlButtons,
    dateVisible,
    isBeingDragged,
    resetOnChange,
    onChange,
    decorationStyle,
    labelStyle,
    checkboxStyle,
}: ChecklistItemProps): ReactElement {
    const [focused, setFocused] = useState(false);

    const { hoverProps, isHovered } = useHover({});
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: setFocused,
    });

    const shouldDisplayControlPanel = () => {
        return (isHovered || focused) && !checkboxDisabled && !readonly && !isBeingDragged;
    };

    return (
        <div
            className={merge([
                'tw-flex tw-content-center',
                shouldDisplayControlPanel() && 'tw-bg-black-5',
                !shouldDisplayControlPanel && 'tw-bg-white',
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
                            disabled={checkboxDisabled}
                            checkedColor={checkboxStyle.checked}
                            uncheckedColor={checkboxStyle.unchecked}
                            showLabel={checked}
                            labelComponent={
                                <CheckboxLabel
                                    disabled={checkboxDisabled}
                                    htmlFor={id}
                                    color={labelStyle.checked}
                                    decoration={decorationStyle}
                                    date={dateVisible && checked ? dayjs(dateCompleted).fromNow() : undefined}
                                >
                                    {text}
                                </CheckboxLabel>
                            }
                        />
                        {!checked && (
                            <MockTextEditor
                                resetOnChange={resetOnChange}
                                color={labelStyle.unchecked}
                                readonly={readonly}
                                onChange={onChange}
                                value={text}
                                placeholder="Add new checklist item"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`tw-flex-none tw-flex tw-items-center ${
                    shouldDisplayControlPanel() ? 'tw-visible' : 'tw-invisible'
                }`}
            >
                {controlButtons ? <ButtonGroup size={ButtonSize.Small}>{controlButtons}</ButtonGroup> : null}
            </div>
        </div>
    );
}
