/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheck, FOCUS_STYLE } from '@frontify/arcade';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { useContext, useRef, FC } from 'react';
import { CheckboxProps } from '../types';
import { CheckboxLabel } from './CheckboxLabel';
import { colorToHexAlpha, joinClassNames } from '@frontify/guideline-blocks-shared';
import { SettingsContext } from '../SettingsContext';

export const Checkbox: FC<CheckboxProps> = ({
    id,
    disabled,
    label,
    dateCompleted,
    ariaLabel,
    checked,
    showLabel,
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    const checkboxStyles = {
        background: checked ? colorToHexAlpha(completeCheckboxColor) : '',
        borderColor: checked ? colorToHexAlpha(completeCheckboxColor) : colorToHexAlpha(incompleteCheckboxColor),
    };

    return (
        <label
            className={joinClassNames([
                'tw-flex tw-select-none tw-outline-none tw-self-start tw-items-start',
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
                className={joinClassNames([
                    'tw-relative tw-flex tw-w-4 tw-h-4 tw-mr-2 tw-items-center tw-justify-center tw-rounded tw-border tw-border-solid tw-flex-shrink-0 tw-bg-white tw-text-white',
                    isFocusVisible && FOCUS_STYLE,
                    disabled && 'tw-pointer-events-none',
                ])}
                style={checkboxStyles}
                data-test-id="checkbox"
                data-checked={checked}
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
