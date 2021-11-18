import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import { ButtonGroup, ButtonSize } from '@frontify/arcade';
import MockTextEditor from './MockTextEditor';
import { useHover } from '@react-aria/interactions';
import { useFocusWithin } from '@react-aria/interactions';
import { Checkbox } from './Checkbox';
import { merge } from './utilities/merge';
import dayjs from './utilities/day';
import { CheckboxLabel } from './CheckboxLabel';

export type ChecklistItemProps = {
    id: string;
    text: string;
    createdAt?: string;
    updatedAt?: string;
    completed: boolean;
    checkboxDisabled: boolean;
    toggleCompleted: (value: boolean) => void;
    dateCompleted?: number;
    dateVisible: boolean;
    readonly: boolean;
    controlButtons: ReactElement;
    decorationStyle: any;
    checkboxStyle: any;
    labelStyle: any;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
};

export default function ChecklistItem({
    id,
    text,
    completed,
    toggleCompleted,
    checkboxDisabled,
    dateCompleted,
    readonly,
    controlButtons,
    dateVisible,
    onChange,
    onBlur,
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
        return (isHovered || focused) && !checkboxDisabled && !readonly;
    };

    return (
        <div
            className={merge([
                'tw-flex tw-content-center',
                shouldDisplayControlPanel() && 'tw-bg-black-5 tw-cursor-pointer',
                !shouldDisplayControlPanel && 'tw-bg-white',
            ])}
            {...hoverProps}
            {...focusWithinProps}
        >
            <div className="tw-p-1 tw-flex tw-flex-auto tw-content-center">
                <Checkbox
                    checked={completed}
                    onChange={toggleCompleted}
                    id={id}
                    ariaLabel={text}
                    disabled={checkboxDisabled}
                    checkedColor={checkboxStyle.checked}
                    uncheckedColor={checkboxStyle.unchecked}
                    labelComponent={
                        completed ? (
                            <CheckboxLabel
                                disabled={checkboxDisabled}
                                htmlFor={id}
                                color={labelStyle.checked}
                                decoration={decorationStyle}
                                date={dateVisible && completed ? dayjs(dateCompleted).fromNow() : undefined}
                            >
                                {text}
                            </CheckboxLabel>
                        ) : (
                            <MockTextEditor
                                color={labelStyle.unchecked}
                                readonly={readonly}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={text}
                                placeholder="Add new checklist item"
                            />
                        )
                    }
                />
            </div>
            <div className={`tw-flex-none tw-flex ${shouldDisplayControlPanel() ? 'tw-visible' : 'tw-invisible'}`}>
                <ButtonGroup size={ButtonSize.Small}>{controlButtons}</ButtonGroup>
            </div>
        </div>
    );
}
