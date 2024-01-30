/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_STYLE, IconCheckMark } from '@frontify/fondue';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-settings';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { FC, MouseEvent, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import { CheckboxProps } from '../types';
import { CheckboxLabel } from './CheckboxLabel';

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

    const { completeCheckboxColor, checkboxColor } = useContext(SettingsContext);

    const checkboxStyles = {
        background: checked ? toHex8String(completeCheckboxColor) : '',
        borderColor: checked ? toHex8String(completeCheckboxColor) : toHex8String(checkboxColor),
    };

    const handleLabelClick = (event: MouseEvent<HTMLLabelElement>) => {
        event.preventDefault();
        toggleState.toggle();
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <label
            className={joinClassNames([
                'tw-flex tw-select-none tw-outline-none tw-self-start tw-items-start',
                !disabled && 'hover:tw-cursor-pointer',
            ])}
            onClick={handleLabelClick}
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
                {checked && <IconCheckMark />}
            </span>
            {showLabel && (
                <CheckboxLabel disabled={disabled} htmlFor={id} dateInMs={dateCompleted}>
                    {label}
                </CheckboxLabel>
            )}
        </label>
    );
};
