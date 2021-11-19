import { IconCheck } from '@frontify/arcade';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import React, { HTMLAttributes, ReactElement, useRef } from 'react';
import { InputLabel } from './CheckboxLabel';
import { FOCUS_STYLE } from './utilities/focusStyle';
import { merge } from './utilities/merge';

export enum CheckboxState {
    Checked = 'Checked',
    Unchecked = 'Unchecked',
}

export type CheckboxProps = {
    id?: string;
    disabled?: boolean;
    checked: boolean;
    onChange?: (isChecked: boolean) => void;
    labelComponent?: ReactElement;
    ariaLabel?: string;
    groupInputProps?: HTMLAttributes<HTMLElement>;
    checkedColor: string;
    uncheckedColor: string;
};

export const Checkbox = ({
    id,
    disabled,
    labelComponent,
    ariaLabel,
    checked,
    groupInputProps,
    checkedColor,
    uncheckedColor,
    onChange,
}: CheckboxProps): ReactElement => {
    let inputRef = useRef();
    const { isFocusVisible, focusProps } = useFocusRing();
    const toggleState = useToggleState({
        onChange: disabled ? undefined : onChange,
        isSelected: checked,
    });
    const { inputProps } = useCheckbox(
        {
            isDisabled: disabled,
            isRequired: false,
            'aria-label': ariaLabel,
        },
        toggleState,
        inputRef
    );

    return (
        <div className="tw-flex tw-items-center tw-transition-colors tw-flex-auto" data-test-id="checkbox">
            <label
                className={merge([
                    'tw-group tw-flex tw-gap-2 tw-select-none tw-outline-none',
                    !disabled && 'hover:tw-cursor-pointer',
                ])}
            >
                <input
                    {...mergeProps(groupInputProps || inputProps, focusProps)}
                    id={id}
                    ref={inputRef}
                    className="tw-sr-only"
                    data-test-id="checkbox-input"
                />
                <span
                    aria-hidden="true"
                    className={merge([
                        'tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border tw-flex-shrink-0',
                        isFocusVisible && FOCUS_STYLE,
                        disabled
                            ? merge(['tw-text-white tw-pointer-events-none', !checked && 'tw-bg-white'])
                            : merge([
                                  !checked &&
                                      'tw-border-black-80 tw-bg-white hover:tw-border-black dark:tw-border-white dark:tw-bg-black dark:hover:tw-border-black-20 dark:hover:tw-bg-black-90 group-hover:tw-bg-white group-hover:tw-border-black dark:group-hover:tw-border-black-20 dark:group-hover:tw-bg-black-90',
                                  checked && 'tw-text-white group-hover:tw-text-white  ',
                              ]),
                    ])}
                    style={{
                        background: checked ? checkedColor : '',
                        border: merge(['1px', 'solid', checked ? checkedColor : uncheckedColor]),
                    }}
                >
                    {checked && <IconCheck />}
                </span>
                {labelComponent}
            </label>
        </div>
    );
};
