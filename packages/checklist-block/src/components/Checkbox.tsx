import { IconCheck } from '@frontify/arcade';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import React, { ReactElement, useContext, useRef } from 'react';
import { SettingsContext } from '..';
import { DefaultValues } from '../types';
import { FOCUS_STYLE } from '../utilities/focusStyle';
import { merge } from '../utilities/merge';
import { CheckboxLabel } from './CheckboxLabel';

export type CheckboxProps = {
    id?: string;
    disabled?: boolean;
    checked: boolean;
    onChange?: (isChecked: boolean) => void;
    labelComponent?: ReactElement;
    ariaLabel?: string;
    showLabel: boolean;
    label: string;
    dateCompleted?: number;
};

export const Checkbox = ({
    id,
    disabled,
    label,
    dateCompleted,
    ariaLabel,
    checked,
    showLabel,
    onChange,
}: CheckboxProps): ReactElement => {
    const inputRef = useRef(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const toggleState = useToggleState({
        onChange: disabled ? undefined : onChange,
        isSelected: checked,
    });
    const { inputProps } = useCheckbox(
        {
            isDisabled: disabled,
            isRequired: false,
            'aria-label': ariaLabel || label,
        },
        toggleState,
        inputRef
    );

    const { completeCheckboxColor, incompleteCheckboxColor } = useContext(SettingsContext);

    return (
        <label
            className={merge([
                'tw-group tw-flex tw-gap-2 tw-select-none tw-outline-none',
                !disabled && 'hover:tw-cursor-pointer',
            ])}
        >
            <input
                {...mergeProps(inputProps, focusProps)}
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
                    background: checked ? completeCheckboxColor.hex : '',
                    border: merge([
                        '1px',
                        'solid',
                        checked && !disabled && completeCheckboxColor.hex,
                        !checked && !disabled && incompleteCheckboxColor.hex,
                        disabled && DefaultValues.incompleteCheckboxColor.hex,
                    ]),
                }}
            >
                {checked && <IconCheck />}
            </span>
            {showLabel && (
                <CheckboxLabel disabled={disabled} htmlFor={id} dateInMs={dateCompleted}>
                    {label}
                </CheckboxLabel>
            )}
        </label>
    );
};
